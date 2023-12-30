import adhanModule from './modules/adhanModule.js';
import getGPS from './modules/getGPS.js';
import error_handling from './modules/error_handling.js';

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
            const statusPERM = await checkPermissionStatus();
            const prayerTimeContainer = document.getElementById('prayer_time');
            const alertElm = document.getElementById('alert');
            const storage = window.localStorage;

            const {
                Calculation = "UmmAlQura",
                Madhab = "Shafi",
                Shafaq = "General",
                fajr: Setfajr = 0,
                sunrise: Setsunrise = 0,
                dhuhr: Setdhuhr = 0,
                asr: Setasr = 0,
                maghrib: Setmaghrib = 0,
                isha: Setisha = 0,
                latitude_settings: Getlatitude,
                longitude_settings: Getlongitude
            } = storage;

            if (statusPERM || (Getlongitude && Getlatitude)) {
                prayerTimeContainer.style.display = "block";

                if (!Getlongitude || !Getlatitude) {
                    const { latitude, longitude } = await getGPS();
                    storage.setItem("latitude_settings", latitude);
                    storage.setItem("longitude_settings", longitude);
                }

                setInterval(() => {
                    const prayerTimes = adhanModule({
                        Calculation,
                        latitude: Number(Getlatitude),
                        longitude: Number(Getlongitude),
                        Madhab,
                        Shafaq,
                        fajr: Number(Setfajr),
                        sunrise: Number(Setsunrise),
                        dhuhr: Number(Setdhuhr),
                        asr: Number(Setasr),
                        maghrib: Number(Setmaghrib),
                        isha: Number(Setisha),
                    });
                    updateUI(prayerTimes);
                }, 1000);

                setInterval(() => {
                    const { latitude_settings, longitude_settings } = storage;
                    if (statusPERM || (longitude_settings && latitude_settings)) {
                        prayerTimeContainer.style.display = "block";
                        alertElm.style.display = "none";
                    } else {
                        prayerTimeContainer.style.display = "none";
                        alertElm.style.display = "block";
                    }
                }, 2000);
            } else {
                // Handle the case when permission is not granted
                prayerTimeContainer.style.display = "none";
                alertElm.style.display = "block";
            }
        } catch (error) {
            error_handling(error);
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
    return new Promise((resolve) => {
        const permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, (status) => {
            resolve(status.hasPermission);
        });
    });
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
    for (const prayer of prayerList) {
        const li = document.getElementById(`${prayer}_li`);
        const span = document.getElementById(prayer);
        if (prayer === nextPrayer) {
            document.getElementById('remaining_name').innerText = getPrayerName(prayer);
            document.getElementById('remaining').style.display = 'block';
            document.getElementById('remaining_time').style.display = 'block';
            li.style.background = 'var(--background_div_hover)';
            li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset';
            span.style.color = 'var(--white-div)';
        } else {
            li.style.background = null;
            li.style.boxShadow = null;
            span.style.color = null;
        }
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