

package de.appplant.cordova.plugin.notification.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import de.appplant.cordova.plugin.notification.Manager;
import de.appplant.cordova.plugin.notification.Notification;

/**
 * Abstract delete receiver for local notifications. Creates the local
 * notification and calls the event functions for further proceeding.
 */
abstract public class AbstractClearReceiver extends BroadcastReceiver {

    /**
     * Called when the notification was cleared from the notification center.
     *
     * @param context Application context
     * @param intent  Received intent with content data
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle      = intent.getExtras();

        if (bundle == null)
            return;

        int toastId        = bundle.getInt(Notification.EXTRA_ID);
        Notification toast = Manager.getInstance(context).get(toastId);

        if (toast == null)
            return;

        onClear(toast, bundle);
    }

    /**
     * Called when a local notification was cleared from outside of the app.
     *
     * @param notification Wrapper around the local notification.
     * @param bundle The bundled extras.
     */
    abstract public void onClear (Notification notification, Bundle bundle);

}
