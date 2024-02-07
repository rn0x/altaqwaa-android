package de.appplant.cordova.plugin.notification.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.UserManager;

import org.json.JSONObject;

import java.util.List;

import de.appplant.cordova.plugin.notification.Builder;
import de.appplant.cordova.plugin.notification.Manager;
import de.appplant.cordova.plugin.notification.Notification;
import de.appplant.cordova.plugin.notification.Options;
import de.appplant.cordova.plugin.notification.Request;

import static android.content.Intent.ACTION_BOOT_COMPLETED;
import static android.os.Build.VERSION.SDK_INT;

/**
 * This class is triggered upon reboot of the device. It needs to re-register
 * the alarms with the AlarmManager since these alarms are lost in case of
 * reboot.
 */
abstract public class AbstractRestoreReceiver extends AbstractNotificationReceiver {

    /**
     * Called on device reboot.
     *
     * @param context Application context
     * @param intent  Received intent with content data
     */
    @Override
    public void onReceive (Context context, Intent intent) {
        String action = intent.getAction();

        if (SDK_INT >= 24) {
          UserManager um = (UserManager) context.getSystemService(UserManager.class);
          if (um == null || um.isUserUnlocked() == false) return;
        }

        Manager mgr               = Manager.getInstance(context);
        List<JSONObject> toasts = mgr.getOptions();

        for (JSONObject data : toasts) {
            Options options    = new Options(context, data);
            Request request    = new Request(options);
            Builder builder    = new Builder(options);
            Notification toast = buildNotification(builder);

            onRestore(request, toast);
        }
    }

    /**
     * Called when a local notification need to be restored.
     *
     * @param request Set of notification options.
     * @param toast   Wrapper around the local notification.
     */
    abstract public void onRestore (Request request, Notification toast);

    /**
     * Build notification specified by options.
     *
     * @param builder Notification builder.
     */
    abstract public Notification buildNotification (Builder builder);

}
