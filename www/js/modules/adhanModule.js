import moment from './moment/moment.js';
import moment_hijri from './moment/moment-hijri.js';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab, Shafaq } from './adhan.js';
import momentDurationFormatSetup from './moment/moment-duration-format.js';
momentDurationFormatSetup(moment);


/**
 * @param {Object} options
 * @param {"MuslimWorldLeague"|"Egyptian"|"Karachi"|"UmmAlQura"|"Dubai"|"Qatar"|"Kuwait"|"Singapore"|"Turkey"|"Tehran"} options.Calculation 
 * @param {Number} options.latitude
 * @param {Number} options.longitude
 * @param {"Hanafi"|"Shafi"} options.Madhab
 * @param {"General"|"Ahmer"|"Abyad"} options.Shafaq
 * @param {Number} options.fajr
 * @param {Number} options.dhuhr
 * @param {Number} options.asr
 * @param {Number} options.maghrib
 * @param {Number} options.isha
 * @returns
 */

export default (options) => {

    let hijri = moment_hijri(moment)
    let coordinates = new Coordinates(options?.latitude, options?.longitude);
    let params = options?.Calculation === 'MuslimWorldLeague' ? CalculationMethod.MuslimWorldLeague() : options?.Calculation === 'Egyptian' ? CalculationMethod.Egyptian() : options?.Calculation === 'Karachi' ? CalculationMethod.Karachi() : options?.Calculation === 'UmmAlQura' ? CalculationMethod.UmmAlQura() : options?.Calculation === 'Dubai' ? CalculationMethod.Dubai() : options?.Calculation === 'Qatar' ? CalculationMethod.Qatar() : options?.Calculation === 'Kuwait' ? CalculationMethod.Kuwait() : options?.Calculation === 'Singapore' ? CalculationMethod.Singapore() : options?.Calculation === 'Turkey' ? CalculationMethod.Turkey() : options?.Calculation === 'Tehran' ? CalculationMethod.NorthAmerica() : CalculationMethod.NorthAmerica();
    params.madhab = options?.Madhab === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
    params.shafaq = options?.Shafaq === "Ahmer" ? Shafaq.Ahmer : options?.Shafaq === "Abyad" ? Shafaq.Abyad : Shafaq.General;
    params.adjustments.fajr = options?.fajr ? options?.fajr : 0;
    params.adjustments.dhuhr = options?.dhuhr ? options?.dhuhr : 0;
    params.adjustments.asr = options?.asr ? options?.asr : 0;
    params.adjustments.maghrib = options?.maghrib ? options?.maghrib : 0;
    params.adjustments.isha = options?.isha ? options?.isha : 0;
    let date = new Date();
    let prayerTimes = new PrayerTimes(coordinates, date, params);
    let nextPrayer = prayerTimes.nextPrayer();
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let now = moment();
    let end = moment(prayerTimes.timeForPrayer(nextPrayer));
    let duration = moment.duration(end.diff(now));
    let remaining = duration.format('hh:mm:ss');
    // let remaining = `${convertTo12HourFormat(duration.hours()).hours}:${duration.minutes()}:${duration.seconds()}`
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

// function convertTo12HourFormat(hours) {
//     let suffix = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     return {
//         hours: hours,
//         suffix: suffix
//     }
// }