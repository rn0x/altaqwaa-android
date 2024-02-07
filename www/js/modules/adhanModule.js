import moment from './moment/moment.js';
import moment_timezone from './moment/moment-timezone.js';
import moment_hijri from './moment/moment-hijri.js';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab, Shafaq } from './adhan.js';
import momentDurationFormatSetup from './moment/moment-duration-format.js';
import error_handling from './error_handling.js';
momentDurationFormatSetup(moment);
moment_timezone(moment);

/**
 * by rn0x
 * @typedef {Object} Options
 * @property {"MuslimWorldLeague"|"Egyptian"|"Karachi"|"UmmAlQura"|"Dubai"|"Qatar"|"Kuwait"|"Singapore"|"Turkey"|"Tehran"} Options.Calculation - طريقة حساب الأوقات الصلاة
 * @property {Number} Options.latitude - خط العرض
 * @property {Number} Options.longitude - خط الطول
 * @property {"Hanafi"|"Shafi"} Options.Madhab - المذهب الفقهي
 * @property {"General"|"Ahmer"|"Abyad"} Options.Shafaq - طريقة حساب الشفق
 * @property {Number} Options.fajr - تعديل وقت الفجر (بالدقائق)
 * @property {Number} Options.dhuhr - تعديل وقت الظهر (بالدقائق)
 * @property {Number} Options.asr - تعديل وقت العصر (بالدقائق)
 * @property {Number} Options.maghrib - تعديل وقت المغرب (بالدقائق)
 * @property {Number} Options.isha - تعديل وقت العشاء (بالدقائق)
 */

/**
 * @typedef {Object} PrayerTimesData
 * @property {string} isha - وقت العشاء
 * @property {string} maghrib - وقت المغرب
 * @property {string} asr - وقت العصر
 * @property {string} dhuhr - وقت الظهر
 * @property {string} fajr - وقت الفجر
 * @property {string} sunrise - وقت الشروق
 * @property {string} nextPrayer - الصلاة التالية
 * @property {string} remainingNext - الوقت المتبقي للصلاة التالية
 * @property {string} currentPrayer - الصلاة الحالية
 * @property {string} timezone - المنطقة الزمنية
 * @property {string} data_hijri - التاريخ الهجري
 * @property {string} data_Gregorian - التاريخ الميلادي
 * @property {string} today - اسم اليوم بالعربية
 * @property {string} hour_minutes - الساعة والدقائق
 * @property {string} seconds - الثواني
 */

/**
 * @param {Options} options - الخيارات المستخدمة لحساب أوقات الصلاة
 * @returns {PrayerTimesData} - بيانات أوقات الصلاة
 */

export default (options) => {
    try {
        const momentHijri = moment_hijri(moment);
        const hijri = momentHijri;
        let coordinates = new Coordinates(options?.latitude, options?.longitude);
        let params = CalculationMethod[options?.Calculation]() || CalculationMethod.NorthAmerica();
        params.madhab = Madhab[options?.Madhab] || Madhab.Shafi;
        params.shafaq = Shafaq[options?.Shafaq] || Shafaq.General;
        params.adjustments = options || {};
        let date = new Date();
        let prayerTimes = new PrayerTimes(coordinates, date, params);
        let nextPrayer = prayerTimes.nextPrayer();
        let timezone = options.timezone;
        let now = moment().tz(timezone);
        let end = moment(prayerTimes.timeForPrayer(nextPrayer)).tz(timezone);
        let duration = moment.duration(end.diff(now));
        let remaining = duration.format('hh:mm:ss');
        remaining = remaining.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (match) => {
            return String.fromCharCode(match.charCodeAt(0) - 1632 + 48);
        });
        remaining = remaining.toLocaleString('en');
        let dayNamesArabic = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        let day = date.getDay();
        let dayNameArabic = dayNamesArabic[day];

        return {
            isha: moment(prayerTimes.isha).tz(timezone).format('h:mm A'),
            maghrib: moment(prayerTimes.maghrib).tz(timezone).format('h:mm A'),
            asr: moment(prayerTimes.asr).tz(timezone).format('h:mm A'),
            dhuhr: moment(prayerTimes.dhuhr).tz(timezone).format('h:mm A'),
            sunrise: moment(prayerTimes.sunrise).tz(timezone).format('h:mm A'),
            fajr: moment(prayerTimes.fajr).tz(timezone).format('h:mm A'),
            nextPrayer: nextPrayer,
            remainingNext: remaining,
            currentPrayer: prayerTimes.currentPrayer(),
            timezone: timezone,
            data_hijri: hijri().tz(timezone).format('iYYYY/iM/iD'),
            data_Gregorian: now.format('YYYY/M/D'),
            today: dayNameArabic,
            hour_minutes: now.format('h:mm'),
            seconds: now.format('ss A')
        };
    } catch (error) {
        error_handling(error);
    }
};