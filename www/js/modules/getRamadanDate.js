import moment from './moment/moment.js';
import moment_timezone from './moment/moment-timezone.js';
import moment_hijri from './moment/moment-hijri.js';
import momentDurationFormatSetup from './moment/moment-duration-format.js';
momentDurationFormatSetup(moment);

// تهيئة وحدة التوقيت لاستخدامها في الوقت الحالي وتحديد وقت بداية شهر رمضان
moment_timezone(moment);

/**
 * الحصول على تاريخ بداية شهر رمضان للعام الحالي بالتقويم الميلادي.
 * @returns {string} - تاريخ بداية شهر رمضان بالتقويم الميلادي في صيغة "YYYY-MM-DD".
 */
function getRamadanStartDate() {
    // الحصول على التاريخ الهجري الحالي
    const momentHijri = moment_hijri(moment);
    const hijri = momentHijri();

    // استخدام الرقم 9 لشهر رمضان
    const hijriDate = hijri.iMonth(8).startOf('iMonth').format('iYYYY/iM/iD');

    // تحويل التاريخ الهجري إلى التقويم الميلادي
    const ramadanStartGregorian = momentHijri(hijriDate, 'iYYYY/iM/iD').format('YYYY-MM-DD');
    return ramadanStartGregorian;
}

/**
 * حساب الوقت المتبقي حتى بداية شهر رمضان.
 * @returns {Object} - كائن يحتوي على الأيام والساعات والدقائق والثواني المتبقية.
 */
export default function remainingTimeUntilRamadan() {
    // استرجاع وحدة التوقيت من الذاكرة المؤقتة، وإعدادها لتكون "Asia/Riyadh" إذا لم تكن محددة
    const localStorageData = window.localStorage;
    const GetTimezone = localStorageData.getItem('timezone_settings');
    const timezone = GetTimezone ? GetTimezone : 'Asia/Riyadh';
    // حساب تاريخ بداية شهر رمضان بالتقويم الميلادي
    const ramadanStart = moment.tz(getRamadanStartDate(timezone), timezone);

    // حساب التاريخ الحالي بوحدة التوقيت المحددة
    const today = moment.tz(timezone);

    // حساب الوقت المتبقي حتى بداية شهر رمضان بالميلي ثانية
    const timeRemaining = ramadanStart - today;

    // تحويل الوقت المتبقي من ميلي ثانية إلى أيام وساعات ودقائق وثواني
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // إذا كان الوقت المتبقي صفراً، فنفترض بأننا في شهر رمضان بالفعل
    if (timeRemaining <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isRamadan: true
        };
    }
    // إرجاع الوقت المتبقي ككائن
    return {
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: secondsRemaining,
        isRamadan: false
    };
}