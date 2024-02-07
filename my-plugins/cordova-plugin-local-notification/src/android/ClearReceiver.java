

package de.appplant.cordova.plugin.localnotification;

import android.os.Bundle;

import de.appplant.cordova.plugin.notification.Notification;
import de.appplant.cordova.plugin.notification.receiver.AbstractClearReceiver;

import static de.appplant.cordova.plugin.localnotification.LocalNotification.fireEvent;
import static de.appplant.cordova.plugin.localnotification.LocalNotification.isAppRunning;
import static de.appplant.cordova.plugin.notification.Request.EXTRA_LAST;

/**
 * The clear intent receiver is triggered when the user clears a
 * notification manually. It un-persists the cleared notification from the
 * shared preferences.
 */
public class ClearReceiver extends AbstractClearReceiver {

    /**
     * Called when a local notification was cleared from outside of the app.
     *
     * @param notification Wrapper around the local notification.
     * @param bundle       The bundled extras.
     */
    @Override
    public void onClear (Notification notification, Bundle bundle) {
        boolean isLast = bundle.getBoolean(EXTRA_LAST, false);

        if (isLast) {
            notification.cancel();
        } else {
            notification.clear();
        }

        if (isAppRunning()) {
            fireEvent("clear", notification);
        }
    }

}
