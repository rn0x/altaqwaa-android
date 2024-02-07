

package de.appplant.cordova.plugin.localnotification;

import android.os.Bundle;
import androidx.core.app.RemoteInput;

import org.json.JSONException;
import org.json.JSONObject;

import de.appplant.cordova.plugin.notification.Notification;
import de.appplant.cordova.plugin.notification.receiver.AbstractClickReceiver;
import de.appplant.cordova.plugin.notification.util.LaunchUtils;

import static de.appplant.cordova.plugin.localnotification.LocalNotification.fireEvent;
import static de.appplant.cordova.plugin.notification.Options.EXTRA_LAUNCH;
import static de.appplant.cordova.plugin.notification.Request.EXTRA_LAST;

/**
 * The receiver activity is triggered when a notification is clicked by a user.
 * The activity calls the background callback and brings the launch intent
 * up to foreground.
 */
public class ClickReceiver extends AbstractClickReceiver {

    /**
     * Called when local notification was clicked by the user.
     *
     * @param notification Wrapper around the local notification.
     * @param bundle       The bundled extras.
     */
    @Override
    public void onClick(Notification notification, Bundle bundle) {
        String action   = getAction();
        JSONObject data = new JSONObject();

        setTextInput(action, data);
        launchAppIf();

        fireEvent(action, notification, data);

        if (notification.getOptions().isSticky())
            return;

        if (isLast()) {
            notification.cancel();
        } else {
            notification.clear();
        }
    }

    /**
     * Set the text if any remote input is given.
     *
     * @param action The action where to look for.
     * @param data   The object to extend.
     */
    private void setTextInput(String action, JSONObject data) {
        Bundle input = RemoteInput.getResultsFromIntent(getIntent());

        if (input == null)
            return;

        try {
            data.put("text", input.getCharSequence(action));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * Launch app if requested by user.
     */
    private void launchAppIf() {
        boolean doLaunch = getIntent().getBooleanExtra(EXTRA_LAUNCH, true);

        if (!doLaunch)
            return;

        LaunchUtils.launchApp(getApplicationContext());
    }

    /**
     * If the notification was the last scheduled one by request.
     */
    private boolean isLast() {
        return getIntent().getBooleanExtra(EXTRA_LAST, false);
    }

}
