package de.appplant.cordova.plugin.notification.receiver;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import de.appplant.cordova.plugin.notification.Manager;
import de.appplant.cordova.plugin.notification.Notification;

import static de.appplant.cordova.plugin.notification.action.Action.CLICK_ACTION_ID;
import static de.appplant.cordova.plugin.notification.action.Action.EXTRA_ID;

/**
 * Abstract content receiver activity for local notifications. Creates the
 * local notification and calls the event functions for further proceeding.
 */
abstract public class AbstractClickReceiver extends NotificationTrampolineActivity {

    public AbstractClickReceiver() {
      super();
    }

    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      onHandleIntent(getIntent());
    }

    /**
     * Called when local notification was clicked to launch the main intent.
     */
    protected void onHandleIntent(Intent intent) {
      // Holds a reference to the intent to handle.

        if (intent == null)
            return;

        Bundle bundle      = intent.getExtras();
        Context context    = getApplicationContext();

        if (bundle == null)
            return;

        int toastId        = bundle.getInt(Notification.EXTRA_ID);
        Notification toast = Manager.getInstance(context).get(toastId);

        if (toast == null)
            return;

        onClick(toast, bundle);
    }

    /**
     * Called when local notification was clicked by the user.
     *
     * @param notification Wrapper around the local notification.
     * @param bundle The bundled extras.
     */
    abstract public void onClick (Notification notification, Bundle bundle);

    /**
     * The invoked action.
     */
    protected String getAction() {
        return getIntent().getExtras().getString(EXTRA_ID, CLICK_ACTION_ID);
    }
}
