

package de.appplant.cordova.plugin.notification.trigger;

import java.util.Calendar;
import java.util.Date;

abstract public class DateTrigger {

    // Default unit is SECOND
    public enum Unit { SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, QUARTER, YEAR }

    // Internal counter
    private int occurrence = 1;

    /**
     * Gets the next trigger date.
     *
     * @param base The date from where to calculate the trigger date.
     *
     * @return null if there's none next trigger date.
     */
    abstract public Date getNextTriggerDate(Date base);

    /**
     * The value of the occurrence.
     */
    public int getOccurrence() {
        return occurrence;
    }

    /**
     * Increase the occurrence by 1.
     */
    void incOccurrence() {
        occurrence += 1;
    }

    /**
     * Gets a calendar instance pointing to the specified date.
     *
     * @param date The date to point.
     */
    Calendar getCal (Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        return cal;
    }

}