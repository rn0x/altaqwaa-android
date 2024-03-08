/**
 * @returns {Promise.<{latitude: Number, longitude: Number, timestamp: Number, timezone: String}>}
 */

export default () => {
    return new Promise((resolve, reject) => {
        navigator?.geolocation?.getCurrentPosition((position) => {

            const timezone = getTimezone();

            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp ,
                timezone : timezone
            });

        }, (error) => {
            reject({
                code: error.code,
                message: error.message,
            });
        });
    });
}

function getTimezone() {
    try {
        // إنشاء كائن لتنسيق التاريخ والوقت
        const formatter = new Intl.DateTimeFormat(undefined, {
            timeZoneName: 'long'
        });

        // الحصول على قيمة timezone
        const timezone = formatter.resolvedOptions().timeZone;

        return timezone;
    } catch (error) {
        console.error('Unable to get timezone:', error);
        return null;
    }
}