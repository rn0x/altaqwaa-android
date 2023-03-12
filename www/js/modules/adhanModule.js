import moment from './moment/moment.js';
import moment_hijri from './moment/moment-hijri.js';
import { Coordinates, CalculationMethod, PrayerTimes } from './adhan.js';
import momentDurationFormatSetup from './moment/moment-duration-format.js';
momentDurationFormatSetup(moment);


/**
 * @param {"MuslimWorldLeague"|"Egyptian"|"Karachi"|"UmmAlQura"|"Dubai"|"Qatar"|"Kuwait"|"Singapore"|"Turkey"|"Tehran"} Calculation 
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns
 */

export default (Calculation, latitude, longitude) => {

    let hijri = moment_hijri(moment)
    let coordinates = new Coordinates(latitude, longitude);
    let params = Calculation === 'MuslimWorldLeague' ? CalculationMethod.MuslimWorldLeague() : Calculation === 'Egyptian' ? CalculationMethod.Egyptian() : Calculation === 'Karachi' ? CalculationMethod.Karachi() : Calculation === 'UmmAlQura' ? CalculationMethod.UmmAlQura() : Calculation === 'Dubai' ? CalculationMethod.Dubai() : Calculation === 'Qatar' ? CalculationMethod.Qatar() : Calculation === 'Kuwait' ? CalculationMethod.Kuwait() : Calculation === 'Singapore' ? CalculationMethod.Singapore() : Calculation === 'Turkey' ? CalculationMethod.Turkey() : Calculation === 'Tehran' ? CalculationMethod.NorthAmerica() : CalculationMethod.NorthAmerica();
    let date = new Date();
    let prayerTimes = new PrayerTimes(coordinates, date, params);
    let nextPrayer = prayerTimes.nextPrayer();
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let now = moment();
    let end = moment(prayerTimes.timeForPrayer(nextPrayer));
    let duration = moment.duration(end.diff(now));
    //let remaining = duration.format('hh:mm:ss');
    let remaining = `${convertTo12HourFormat(duration.hours()).hours}:${duration.minutes()}:${duration.seconds()}`
    let dayNamesArabic = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    let day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    let dayNameArabic = dayNamesArabic[day]; // get the corresponding Arabic day name from the array

    return {
        isha: moment(prayerTimes.isha).format('h:mm A'),
        maghrib: moment(prayerTimes.maghrib).format('h:mm A'),
        asr: moment(prayerTimes.asr).format('h:mm A'),
        dhuhr: moment(prayerTimes.dhuhr).format('h:mm A'),
        fajr: moment(prayerTimes.fajr).format('h:mm A'),
        nextPrayer: nextPrayer,
        remainingNext: remaining,
        currentPrayer: prayerTimes.currentPrayer(),
        timezone: timezone,
        data_hijri: hijri().format('iYYYY/iM/iD'),
        data_Gregorian: now.format('YYYY/M/D'),
        today: dayNameArabic,
        hour_minutes: now.format('h:mm'),
        seconds: now.format(': ss A'),
    };

}

function convertTo12HourFormat(hours) {
    let suffix = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return {
        hours: hours,
        suffix: suffix
    }
}