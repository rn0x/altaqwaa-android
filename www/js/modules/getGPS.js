/**
 * @returns {Promise.<{latitude: Number, longitude: Number, timestamp: Number}>}
 */

export default () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {

            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp 
            });

        }, (error) => {
            reject({
                code: error.code,
                message: error.message,
            });
        });
    });
}