/**
 * @module initSettingsPage
 * @desc وحدة تهيئة صفحة الإعدادات
 * @exports initSettingsPage
 */

import getGPS from './modules/getGPS.js';
import error_handling from './modules/error_handling.js';

/**
 * القيم الافتراضية للإعدادات
 * @constant {Object}
 */
const DEFAULT_VALUES = {
    Calculation_settings: 'UmmAlQura',
    Shafaq_settings: 'General',
    madhab_settings: 'Shafi',
    notifications_adhan: true,
    longitude_settings: null,
    latitude_settings: null,
    fajr_settings: 0,
    sunrise_settings: 0,
    dhuhr_settings: 0,
    asr_settings: 0,
    maghrib_settings: 0,
    isha_settings: 0,
};

/**
 * الحصول على عنصر DOM باستخدام معرف العنصر
 * @function
 * @param {string} id - معرف العنصر
 * @returns {HTMLElement} - عنصر DOM
 */
const getElementById = (id) => document.getElementById(id);

/**
 * تعيين القيم الافتراضية للإعدادات
 * @function
 */
const setDefaultValues = () => {
    const storage = window.localStorage;

    Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
        const element = getElementById(key);
        if (element) {
            const storedValue = storage.getItem(key);

            if (key === 'Calculation_settings' || key === 'Shafaq_settings' || key === 'madhab_settings') {
                // ابحث عن العنصر المناسب في select وقم بتحديد الخيار المناسب
                const option = element.querySelector(`option[value="${storedValue || value}"]`);
                if (option) {
                    option.selected = true;
                }
            } else if (key === 'notifications_adhan') {
                element.checked = storedValue !== null && storedValue !== undefined ? bool(storedValue) : true;
            } else if (key === 'longitude_settings' || key === 'latitude_settings') {
                const longitudeValue = storage.getItem('longitude');
                const latitudeValue = storage.getItem('latitude');
                if (longitudeValue && latitudeValue) {
                    element.value = key === 'longitude_settings' ? longitudeValue : latitudeValue;
                }
            } else {
                element.value = storedValue !== null && storedValue !== undefined ? Number(storedValue) : value;
            }
        }
    });
};

/**
 * التعامل مع تحديث الموقع
 * @function
 */
const handleRefreshLocation = async () => {
    try {
        const statusPERM = await permissionStatus();

        if (statusPERM) {
            const { latitude, longitude } = await getGPS();
            const storage = window.localStorage;

            storage.setItem('latitude', latitude);
            storage.setItem('longitude', longitude);

            const alertEl = getElementById('alert');
            if (alertEl) {
                alertEl.style.display = 'block';

                setTimeout(() => {
                    alertEl.style.display = 'none';
                    window.location.href = '/pages/settings.html';
                }, 1000);
            }
        } else {
            const textAlert = getElementById('text_alert');
            const alertEl = getElementById('alert');

            if (textAlert && alertEl) {
                textAlert.innerText =
                    'الرجاء السماح بالوصول الى الموقع الجغرافي او قم بإدخال الإحداثيات بشكل يدوي';
                alertEl.style.display = 'block';

                setTimeout(() => {
                    alertEl.style.display = 'none';
                    window.location.href = '/pages/settings.html';
                }, 3000);
            }
        }
    } catch (error) {
        error_handling(error);
    }
};

/**
 * التعامل مع حفظ الإعدادات
 * @function
 */
const handleSaveSettings = () => {
    const storage = window.localStorage;

    Object.entries(DEFAULT_VALUES).forEach(([key]) => {
        const element = getElementById(key);
        if (element) {

            if (key === 'notifications_adhan') {
                storage.setItem(key, element.checked);
            } else {
                storage.setItem(key, element.value);
            }
        }
    });

    const alertEl = getElementById('alert');
    if (alertEl) {
        alertEl.style.display = 'block';

        setTimeout(() => {
            alertEl.style.display = 'none';
            window.location.href = '/pages/settings.html';
        }, 1000);
    }
};

/**
 * تحويل القيمة إلى قيمة منطقية
 * @function
 * @param {string} v - القيمة الأصلية
 * @returns {boolean} - القيمة المنطقية
 */
function bool(v = '') {
    return !['false', 'null', 'NaN', 'undefined', '0'].includes(v);
}

/**
 * التحقق من حالة إذن الوصول إلى الموقع
 * @function
 * @returns {Promise<boolean>} - الوعد بقيمة منطقية تمثل حالة إذن الوصول
 */
async function permissionStatus() {
    return new Promise((resolve) => {
        const permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, (status) => {
            resolve(status.hasPermission);
        });
    });
}

/**
 * تصدير الوحدة
 */
export default async () => {
    if (window.location.pathname === '/pages/settings.html') {
        try {
            setDefaultValues();

            const back = getElementById('back');
            const refreshLocation = getElementById('refresh_location');
            const saveSettings = getElementById('settings_save');

            if (back) {
                back.addEventListener('click', () => {
                    window.location.href = '/more.html';
                });
            }

            if (refreshLocation) {
                refreshLocation.addEventListener('click', handleRefreshLocation);
            }

            if (saveSettings) {
                saveSettings.addEventListener('click', handleSaveSettings);
            }
        } catch (error) {
            error_handling(error);
        }
    }
};