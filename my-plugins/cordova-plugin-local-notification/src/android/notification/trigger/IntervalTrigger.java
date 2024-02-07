

package de.appplant.cordova.plugin.notification.trigger;

import java.util.Calendar;
import java.util.Date;

/**
 * Trigger class for interval based notification. Trigger by a fixed interval
 * from now.
 */
public class IntervalTrigger extends DateTrigger {

    // The number of ticks per interval
    private final int ticks;

    // The unit of the ticks
    final Unit unit;

    /**
     * Interval trigger based from now.
     *
     * @param ticks The number of ticks per interval.
     * @param unit  The unit of the ticks.
     */
    public IntervalTrigger(int ticks, Unit unit) {
        this.ticks = ticks;
        this.unit  = unit;
    }

    /**
     * Gets the next trigger date.
     *
     * @param base The date from where to calculate the trigger date.
     *
     * @return null if there's none next trigger date.
     */
    @Override
    public Date getNextTriggerDate(Date base) {
        Calendar cal = getCal(base);

        addInterval(cal);
        incOccurrence();

        return cal.getTime();
    }

    /**
     * Adds the amount of ticks to the calendar.
     *
     * @param cal The calendar to manipulate.
     */
    void addInterval(Calendar cal) {
        switch (unit) {
            case SECOND:
                cal.add(Calendar.SECOND, ticks);
                break;
            case MINUTE:
                cal.add(Calendar.MINUTE, ticks);
                break;
            case HOUR:
                cal.add(Calendar.HOUR_OF_DAY, ticks);
                break;
            case DAY:
                cal.add(Calendar.DAY_OF_YEAR, ticks);
                break;
            case WEEK:
                cal.add(Calendar.WEEK_OF_YEAR, ticks);
                break;
            case MONTH:
                cal.add(Calendar.MONTH, ticks);
                break;
            case QUARTER:
                cal.add(Calendar.MONTH, ticks * 3);
                break;
            case YEAR:
                cal.add(Calendar.YEAR, ticks);
                break;
        }
    }

}