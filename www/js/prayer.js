import adhanModule from './modules/adhanModule.js';
import getGPS from './modules/getGPS.js';
import errorHandling from './modules/error_handling.js';

/**
 * الدالة الرئيسية لتحديث وعرض أوقات الصلاة
 *
 * @function
 * @async
 * @returns {Promise<void>}
 */

export default async () => {
    const prayerPagePath = '/prayer.html';

    if (window.location.pathname === prayerPagePath) {
        try {
            const loadingElement = document.getElementById('loading');
            const permissionStatus = await checkPermissionStatus();
            const prayerTimeContainer = document.getElementById('prayer_time');
            const alertElement = document.getElementById('alert');
            const localStorageData = window.localStorage;

            let {
                latitude_settings: storedLatitude,
                longitude_settings: storedLongitude,
                timezone_settings: storedTimezone
            } = localStorageData;

            if (permissionStatus || (storedLongitude && storedLatitude && storedTimezone)) {
                loadingElement.style.display = "block";

                if (!storedLongitude || !storedLatitude || !storedTimezone) {
                    const { latitude, longitude, timezone } = await getGPS();
                    localStorageData.setItem("latitude_settings", latitude);
                    localStorageData.setItem("longitude_settings", longitude);
                    localStorageData.setItem("timezone_settings", timezone);
                }

                setInterval(async () => {
                    let {
                        Calculation_settings: calculationMethod = "UmmAlQura",
                        madhab_settings: madhab = "Shafi",
                        Shafaq_settings: shafaqMethod = "General",
                        fajr_settings: storedFajrAngle = 0,
                        sunrise_settings: storedSunriseAngle = 0,
                        dhuhr_settings: storedDhuhrAngle = 0,
                        asr_settings: storedAsrAngle = 0,
                        maghrib_settings: storedMaghribAngle = 0,
                        isha_settings: storedIshaAngle = 0,
                        latitude_settings: storedLatitude,
                        longitude_settings: storedLongitude,
                        timezone_settings: storedTimezone
                    } = localStorageData;

                    const prayerTimes = adhanModule({
                        Calculation: calculationMethod,
                        latitude: Number(storedLatitude),
                        longitude: Number(storedLongitude),
                        timezone: storedTimezone,
                        madhab,
                        Shafaq: shafaqMethod,
                        fajr: Number(storedFajrAngle),
                        sunrise: Number(storedSunriseAngle),
                        dhuhr: Number(storedDhuhrAngle),
                        asr: Number(storedAsrAngle),
                        maghrib: Number(storedMaghribAngle),
                        isha: Number(storedIshaAngle),
                    });

                    if (permissionStatus || (storedLongitude && storedLatitude && storedTimezone)) {
                        if (!storedLongitude || !storedLatitude || !storedTimezone) {
                            const { latitude, longitude, timezone } = await getGPS();
                            localStorageData.setItem("latitude_settings", latitude);
                            localStorageData.setItem("longitude_settings", longitude);
                            localStorageData.setItem("timezone_settings", timezone);
                        }
                        prayerTimeContainer.style.display = "block";
                        alertElement.style.display = "none";
                        loadingElement.style.display = "none";

                        const {
                            timezone,
                            fajr,
                            sunrise,
                            dhuhr,
                            asr,
                            maghrib,
                            isha,
                        } = prayerTimes;

                        if (fajr && sunrise && dhuhr && asr && maghrib && isha && timezone) {
                            updateUI(prayerTimes);
                        }

                    } else {
                        loadingElement.style.display = "none";
                        prayerTimeContainer.style.display = "none";
                        alertElement.style.display = "block";
                    }

                }, 1000);
            } else {
                // Handle the case when permission is not granted
                prayerTimeContainer.style.display = "none";
                alertElement.style.display = "block";
            }

        } catch (error) {
            errorHandling(error);
        }
    }
};

/**
 * الدالة لفحص حالة إذن الوصول للموقع
 *
 * @function
 * @async
 * @returns {Promise<boolean>} - القيمة `true` إذا كان الإذن ممنوح، والقيمة `false` إذا لم يتم منح الإذن
 */

async function checkPermissionStatus() {

    if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.permissions) {
        return true;
    }

    else {
        return new Promise((resolve) => {
            const permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, async (status) => {
                resolve(status.hasPermission);
            });
        });
    }
}

/**
 * الدالة لتحديث واجهة المستخدم بناءً على أوقات الصلاة
 *
 * @function
 * @param {PrayerTimes} prayerTimes - معلومات أوقات الصلاة
 * @returns {void}
 */

function updateUI(prayerTimes) {
    const {
        data_hijri,
        data_Gregorian,
        today,
        hour_minutes,
        seconds,
        timezone,
        remainingNext,
        fajr,
        sunrise,
        dhuhr,
        asr,
        maghrib,
        isha,
        nextPrayer
    } = prayerTimes;

    document.getElementById('data_hijri').innerText = data_hijri;
    document.getElementById('data_Gregorian').innerText = data_Gregorian;
    document.getElementById('datoday').innerText = today;
    document.getElementById('hour_minutes').innerText = hour_minutes;
    document.getElementById('seconds').innerText = seconds;
    document.getElementById('country').innerHTML = `المنطقة الزمنية: <span id="city">${timezone}</span>`;
    document.getElementById('remaining_time').innerText = remainingNext;
    document.getElementById('time_fajr').innerText = fajr;
    document.getElementById('time_sunrise').innerText = sunrise;
    document.getElementById('time_dhuhr').innerText = dhuhr;
    document.getElementById('time_asr').innerText = asr;
    document.getElementById('time_maghrib').innerText = maghrib;
    document.getElementById('time_isha').innerText = isha;

    const prayerList = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const foundPrayer = prayerList.find(item => item === nextPrayer);

    const liElements = document.getElementById(`${foundPrayer}_li`);
    const span = document.getElementById(foundPrayer);
    if (foundPrayer) {
        document.getElementById('remaining_name').innerText = getPrayerName(foundPrayer);
        document.getElementById('remaining').style.display = 'block';
        document.getElementById('remaining_time').style.display = 'block';
        liElements.style.background = 'var(--background_div_hover)';
        liElements.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset';
        span.style.color = 'var(--white-div)';
    } else {
        document.getElementById('remaining_name').innerText = getPrayerName(foundPrayer);
        document.getElementById('remaining').style.display = 'none';
        document.getElementById('remaining_time').style.display = 'none';
        liElements.style.background = null;
        liElements.style.boxShadow = null;
        span.style.color = null;
    }

}

/**
 * الدالة للحصول على اسم الصلاة بناءً على اسمها الداخلي
 *
 * @function
 * @param {string} prayer - اسم الصلاة الداخلي
 * @returns {string} - اسم الصلاة باللغة العربية
 */

function getPrayerName(prayer) {
    switch (prayer) {
        case 'fajr':
            return 'الفجر';
        case 'sunrise':
            return 'الشروق';
        case 'dhuhr':
            return 'الظهر';
        case 'asr':
            return 'العصر';
        case 'maghrib':
            return 'المغرب';
        case 'isha':
            return 'العشاء';
        default:
            return 'لايوجد';
    }
}