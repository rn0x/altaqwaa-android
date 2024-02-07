

package de.appplant.cordova.plugin.notification.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import de.appplant.cordova.plugin.notification.Builder;
import de.appplant.cordova.plugin.notification.Manager;
import de.appplant.cordova.plugin.notification.Notification;
import de.appplant.cordova.plugin.notification.Options;

/**
 * Abstract broadcast receiver for local notifications. Creates the
 * notification options and calls the event functions for further proceeding.
 */
abstract public class AbstractTriggerReceiver extends AbstractNotificationReceiver {

    /**
     * Called when an alarm was triggered.
     *
     * @param context Application context
     * @param intent  Received intent with content data
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle   = intent.getExtras();

        if (bundle == null)
            return;

        int toastId     = bundle.getInt(Notification.EXTRA_ID, 0);
        Options options = Manager.getInstance(context).getOptions(toastId);

        if (options == null)
            return;

        Builder builder    = new Builder(options);
        Notification toast = buildNotification(builder, bundle);

        if (toast == null)
            return;

        onTrigger(toast, bundle);
    }

    /**
     * Called when a local notification was triggered.
     *
     * @param notification Wrapper around the local notification.
     * @param bundle       The bundled extras.
     */
    abstract public void onTrigger (Notification notification, Bundle bundle);

    /**
     * Build notification specified by options.
     *
     * @param builder Notification builder.
     * @param bundle  The bundled extras.
     */
    abstract public Notification buildNotification (Builder builder,
                                                    Bundle bundle);

}
