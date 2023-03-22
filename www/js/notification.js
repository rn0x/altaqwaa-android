import adhanModule from './modules/adhanModule.js';
import getGPS from './modules/getGPS.js';
import moment from './modules/moment/moment.js';

export default async () => {

    // LocalStorage 

    let storage = window.localStorage;
    let Calculation = storage.getItem('Calculation');
    let Getlatitude = storage.getItem('latitude');
    let Getlongitude = storage.getItem('longitude');
    let notification = storage.getItem('notification');

    if (Getlongitude === null || Getlatitude === null) {

        let GPS = await getGPS();
        Getlatitude = GPS.latitude;
        Getlongitude = GPS.longitude;
        storage.setItem("latitude", Getlatitude);
        storage.setItem("longitude", Getlongitude);

    }

    if (notification ? bool(notification) : true) {

        setInterval(async () => {

            let AdhanPlaying = storage.getItem('AdhanPlaying');
            AdhanPlaying === null ? storage.setItem('AdhanPlaying', "false") : false;
            let timenow = moment().format('h:mm A');
            let adhan = adhanModule(Calculation ? Calculation : "UmmAlQura", Number(Getlatitude), Number(Getlongitude));
            // let slah = adhan.nextPrayer === "fajr" ? "الفجر" : adhan.nextPrayer === "dhuhr" ? "الظهر" : adhan.nextPrayer === "asr" ? "العصر" : adhan.nextPrayer === "maghrib" ? "المغرب" : adhan.nextPrayer === "isha" ? "العشاء" : "لايوجد";
            let fileAdhan = adhan.nextPrayer === "fajr" ? "/mp3/002.mp3" : "/mp3/001.mp3"
            let audioAdhan = new Audio(fileAdhan);
            audioAdhan.id = 'audioAdhan';
            audioAdhan.preload = 'none';
            audioAdhan.autoplay = false;

            switch (timenow) {
                case adhan?.fajr:

                    if (AdhanPlaying === "false") {

                        storage.setItem('AdhanPlaying', "true");
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: `${adhan.today} - ${adhan.data_hijri}`,
                            text: `حان الآن وقت صلاة الفجر`,
                            actions: [
                                { id: 'stop', title: 'إيقاف الأذآن' }
                            ],
                        });

                        await audioAdhan.play();

                        cordova.plugins.notification.local.on('stop', function (notification, eopts) {
                            audioAdhan.pause();
                            audioAdhan.currentTime = 0;
                        });
                    }

                    break;

                case adhan?.dhuhr:

                    if (AdhanPlaying === "false") {

                        storage.setItem('AdhanPlaying', "true");
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: `${adhan.today} - ${adhan.data_hijri}`,
                            text: `حان الآن وقت صلاة الظهر`,
                            actions: [
                                { id: 'stop', title: 'إيقاف الأذآن' }
                            ],
                        });

                        await audioAdhan.play();

                        cordova.plugins.notification.local.on('stop', function (notification, eopts) {
                            audioAdhan.pause();
                            audioAdhan.currentTime = 0;
                        });
                    }

                    break;

                case adhan?.asr:

                    if (AdhanPlaying === "false") {

                        storage.setItem('AdhanPlaying', "true");
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: `${adhan.today} - ${adhan.data_hijri}`,
                            text: `حان الآن وقت صلاة العصر`,
                            actions: [
                                { id: 'stop', title: 'إيقاف الأذآن' }
                            ],
                        });

                        await audioAdhan.play();

                        cordova.plugins.notification.local.on('stop', function (notification, eopts) {
                            audioAdhan.pause();
                            audioAdhan.currentTime = 0;
                        });
                    }

                    break;

                case adhan?.maghrib:

                    if (AdhanPlaying === "false") {

                        storage.setItem('AdhanPlaying', "true");
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: `${adhan.today} - ${adhan.data_hijri}`,
                            text: `حان الآن وقت صلاة المغرب`,
                            actions: [
                                { id: 'stop', title: 'إيقاف الأذآن' }
                            ],
                        });

                        await audioAdhan.play();

                        cordova.plugins.notification.local.on('stop', function (notification, eopts) {
                            audioAdhan.pause();
                            audioAdhan.currentTime = 0;
                        });
                    }

                    break;

                case adhan?.isha:

                    if (AdhanPlaying === "false") {

                        storage.setItem('AdhanPlaying', "true");
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: `${adhan.today} - ${adhan.data_hijri}`,
                            text: `حان الآن وقت صلاة العشاء`,
                            actions: [
                                { id: 'stop', title: 'إيقاف الأذآن' }
                            ],
                        });

                        await audioAdhan.play();

                        cordova.plugins.notification.local.on('stop', function (notification, eopts) {
                            audioAdhan.pause();
                            audioAdhan.currentTime = 0;
                        });
                    }

                    break;

                default:
                    break;
            }

        }, 5000);

        setInterval(() => {

            let AdhanPlaying = storage.getItem('AdhanPlaying');
            AdhanPlaying === null ? storage.setItem('AdhanPlaying', "true") : false;

            if (AdhanPlaying === "true") {

                storage.setItem('AdhanPlaying', "false");
            }

        }, 60000);

    }

}

function bool(v) {
    return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v;
}