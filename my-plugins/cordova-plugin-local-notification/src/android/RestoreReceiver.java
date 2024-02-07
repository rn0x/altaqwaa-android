package de.appplant.cordova.plugin.localnotification;

import android.content.Context;
import android.util.Log;

import java.util.Date;

import de.appplant.cordova.plugin.notification.Builder;
import de.appplant.cordova.plugin.notification.Manager;
import de.appplant.cordova.plugin.notification.Notification;
import de.appplant.cordova.plugin.notification.Request;
import de.appplant.cordova.plugin.notification.receiver.AbstractRestoreReceiver;

import static de.appplant.cordova.plugin.localnotification.LocalNotification.fireEvent;
import static de.appplant.cordova.plugin.localnotification.LocalNotification.isAppRunning;
import static de.appplant.cordova.plugin.localnotification.LocalNotification.isInForeground;

/**
 * This class is triggered upon reboot of the device. It needs to re-register
 * the alarms with the AlarmManager since these alarms are lost in case of
 * reboot.
 */
public class RestoreReceiver extends AbstractRestoreReceiver {
    /**
     * Called when a local notification need to be restored.
     *
     * @param request Set of notification options.
     * @param toast   Wrapper around the local notification.
     */
    @Override
    public void onRestore (Request request, Notification toast) {
        Date date     = request.getTriggerDate();
        boolean after = date != null && date.after(new Date());

        if (!after && toast.isHighPrio()) {
            performNotification(toast);
        } else {
            // reschedule if we aren't firing here.
            // If we do fire, performNotification takes care of
            // next schedule.
            
            Context ctx = toast.getContext();
            Manager mgr = Manager.getInstance(ctx);

            if (after || toast.isRepeating()) {
                mgr.schedule(request, TriggerReceiver.class);
            }
        }
   }

    @Override
    public void dispatchAppEvent(String key, Notification notification) {
        fireEvent(key, notification);
    }

    @Override
    public boolean checkAppRunning() {
        return isAppRunning();
    }

    /**
     * Build notification specified by options.
     *
     * @param builder Notification builder.
     */
    @Override
    public Notification buildNotification (Builder builder) {
        return builder
                .setClickActivity(ClickReceiver.class)
                .setClearReceiver(ClearReceiver.class)
                .build();
    }

}
