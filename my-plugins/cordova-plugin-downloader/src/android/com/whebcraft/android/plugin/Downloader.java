package com.whebcraft.android.plugin;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import java.io.File;

import android.os.Build;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.HashMap;

public class Downloader extends CordovaPlugin {

  public static final String ACTION_DOWNLOAD = "download";

  private static final String TAG = "DownloaderPlugin";

  private Activity cordovaActivity;
  private DownloadManager downloadManager;
  private HashMap<Long, Download> downloadMap;

  @Override
  protected void pluginInitialize() {
    Log.d(TAG, "PluginInitialize");

    cordovaActivity = this.cordova.getActivity();

    downloadManager = (DownloadManager) cordovaActivity.getSystemService(Context.DOWNLOAD_SERVICE);
    downloadMap = new HashMap();

    // Register receiver for Notification actions
    cordovaActivity.registerReceiver(downloadReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

    Log.d(TAG, "CordovaPlugin: execute " + action);

    if (ACTION_DOWNLOAD.equals(action)) {

      Log.d(TAG, "CordovaPlugin: load " + action);
      return download(args, callbackContext);

    }

    return false;

  }

  private boolean download(JSONArray args, CallbackContext callbackContext) {
    Log.d(TAG, "CordovaPlugin: " + ACTION_DOWNLOAD);

    try {

      JSONObject arg_object = args.getJSONObject(0);
      String path = arg_object.getString("path");
      String title = arg_object.getString("title");
      String folder = arg_object.getString("folder");
      String description = arg_object.getString("description");
      File direct;
      Context context = cordovaActivity.getApplicationContext(); // Add this line to get the context
      DownloadManager.Request request = new DownloadManager.Request(Uri.parse(arg_object.getString("url"))); // Move this line up
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        direct = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
        if (direct == null) {
          Log.e(TAG, "External storage directory is null");
          // Handle the case where external storage is not available
          return false; // Return false as the download cannot proceed without a valid directory
        }
      } else {
        direct = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), folder);
        if (!direct.exists()) {
          if (!direct.mkdirs()) {
            Log.e(TAG, "Failed to create directory");
            // Handle the case where directory creation failed
            return false; // Return false as the download cannot proceed without a valid directory
          }
        }
      }

      // Set the destination for the downloaded file
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        if (direct != null) {
          request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, path);
        } else {
          Log.e(TAG, "Failed to set destination: External storage directory is null");
          return false; // Return false as the download cannot proceed without a valid directory
        }
      } else {
        if (direct != null) {
          request.setDestinationUri(Uri.fromFile(new File(direct, path)));
        } else {
          Log.e(TAG, "Failed to set destination: External storage directory is null");
          return false; // Return false as the download cannot proceed without a valid directory
        }
      }

      File delExisingFile = new File(direct.getPath() + "/" + path);
      delExisingFile.delete();

      Boolean visible = Boolean.valueOf(arg_object.getString("visible"));

      // Move the lines setting other request properties below the destination setup
      // Restrict the types of networks over which this download may proceed.
      request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE);
      // Set whether this download may proceed over a roaming connection.
      request.setAllowedOverRoaming(true);
      // Set the title of this download, to be displayed in notifications (if
      // enabled).
      request.setTitle(title);
      // Set a description of this download, to be displayed in notifications (if
      // enabled)
      request.setDescription(description);
      // This download doesn't show in the UI or in the notifications.
      request.setVisibleInDownloadsUi(true);
      if (!visible) {
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN);
      } else {
        // This download is visible and shows in the notifications while in progress and
        // after completion.
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
      }
      // Set the destination for the downloaded as defined by the user within the
      // device files directory
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, path);

      } else {
        request.setDestinationInExternalPublicDir("/" + folder, path);
      }

      // save the download
      downloadMap.put(downloadManager.enqueue(request), new Download(path, folder, callbackContext)); // Use the request directly here
      callbackContext.success();

      return true;

    } catch (Exception e) {

      Log.e(TAG, "Exception: " + e.getMessage());
      callbackContext.error(e.getMessage());

      return false;
    }
  }

  private BroadcastReceiver downloadReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      DownloadManager.Query query = new DownloadManager.Query();
      Long downloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, 0);
      query.setFilterById(downloadId);
      Cursor cursor = downloadManager.query(query);

      if (cursor != null && cursor.moveToFirst()) {
        int columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
        int status = cursor.getInt(columnIndex);
        int columnReason = cursor.getColumnIndex(DownloadManager.COLUMN_REASON);
        int reason = cursor.getInt(columnReason);

        Download currentDownload = downloadMap.get(downloadId);
        if (currentDownload != null) {
          switch (status) {
            case DownloadManager.STATUS_SUCCESSFUL:
              try {
                JSONObject entry = new JSONObject();
                entry.put("path", "file:///storage/sdcard0/" + currentDownload.folder + "/" + currentDownload.path);
                entry.put("file", currentDownload.path);
                entry.put("folder", currentDownload.folder);
                currentDownload.callbackContext.success(entry);
              } catch (Exception e) {
                Log.e(TAG, "Exception: " + e.getMessage());
                currentDownload.callbackContext.error(e.getMessage());
              }
              break;
            case DownloadManager.STATUS_FAILED:
              currentDownload.callbackContext.error(reason);
              break;
            case DownloadManager.STATUS_PAUSED:
            case DownloadManager.STATUS_PENDING:
            case DownloadManager.STATUS_RUNNING:
            default:
              break;
          }
          // Remove the download from the map after processing
          downloadMap.remove(downloadId);
        }
      }
    }
  };

  private class Download {
    public String path;
    public String folder;
    public CallbackContext callbackContext;

    public Download(String path, String folder, CallbackContext callbackContext) {
      this.path = path;
      this.folder = folder;
      this.callbackContext = callbackContext;
    }
  }

}