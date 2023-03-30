import adhanModule from './modules/adhanModule.js';
import error_handling from './modules/error_handling.js';
import getGPS from './modules/getGPS.js';
import moment from './modules/moment/moment.js';

export default async () => {

    try {

        // LocalStorage 

        let storage = window.localStorage;
        let Calculation = storage.getItem('Calculation');
        let Madhab = storage.getItem('Madhab');
        let Shafaq = storage.getItem('Shafaq');
        let Setfajr = storage.getItem('fajr');
        let Setdhuhr = storage.getItem('dhuhr');
        let Setasr = storage.getItem('asr');
        let Setmaghrib = storage.getItem('maghrib');
        let Setisha = storage.getItem('isha');
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

        while (notification ? bool(notification) : true) {


            let timenow = moment().format('h:mm A');
            let adhan = adhanModule({
                Calculation: Calculation ? Calculation : "UmmAlQura",
                latitude: Number(Getlatitude),
                longitude: Number(Getlongitude),
                Madhab: Madhab ? Madhab : "Shafi",
                Shafaq: Shafaq ? Shafaq : "General",
                fajr: Setfajr ? Number(Setfajr) : 0,
                dhuhr: Setdhuhr ? Number(Setdhuhr) : 0,
                asr: Setasr ? Number(Setasr) : 0,
                maghrib: Setmaghrib ? Number(Setmaghrib) : 0,
                isha: Setisha ? Number(Setisha) : 0,
            });
            // let slah = adhan.nextPrayer === "fajr" ? "الفجر" : adhan.nextPrayer === "dhuhr" ? "الظهر" : adhan.nextPrayer === "asr" ? "العصر" : adhan.nextPrayer === "maghrib" ? "المغرب" : adhan.nextPrayer === "isha" ? "العشاء" : "لايوجد";
            let fileAdhan = adhan.nextPrayer === "fajr" ? "/mp3/002.mp3" : "/mp3/001.mp3"

            switch (timenow) {
                case adhan?.fajr:

                    await notification_adhan("الفجر", fileAdhan, storage);

                    break;

                case adhan?.dhuhr:

                    await notification_adhan("الظهر", fileAdhan, storage);

                    break;

                case adhan?.asr:

                    await notification_adhan("العصر", fileAdhan, storage);

                    break;

                case adhan?.maghrib:

                    await notification_adhan("المغرب", fileAdhan, storage);

                    break;

                case adhan?.isha:

                    await notification_adhan("العشاء", fileAdhan, storage);

                    break;

                default:
                    break;
            }

            // sleep 
            await new Promise(r => setTimeout(r, 6000));

        };

    } catch (error) {

        error_handling(error);

    }

}

function bool(v) {
    return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v;
}

async function notification_adhan(name, fileAdhan, storage) {

    let AdhanPlaying = storage.getItem('AdhanPlaying');
    AdhanPlaying === null ? storage.setItem('AdhanPlaying', "false") : false;

    if (bool(AdhanPlaying) === false) {

        let audioAdhan = new Audio(fileAdhan);
        audioAdhan.id = 'audioAdhan';
        audioAdhan.loop = false;
        audioAdhan.preload = 'none';
        audioAdhan.autoplay = false;

        storage.setItem('AdhanPlaying', "true");

        await audioAdhan.play();

        audioAdhan.addEventListener('ended', () => {
            audioAdhan.pause();
            audioAdhan.currentTime = 0;
            storage.setItem('AdhanPlaying', "false");
        });

        navigator.notification.confirm(
            `حان الآن وقت صلاة ${name}`,
            (e) => {
                if (e === 1) {
                    audioAdhan.pause();
                    audioAdhan.currentTime = 0;
                }
            },
            'تنبيه بوقت الصلاة',
            ['إيقاف الأذان', 'خروج']
        );

        audioAdhan.addEventListener("pause", async () => {
            if (audioAdhan.currentTime !== 0) {
                await audioAdhan.play();
            }
        });

    }

    else {

        setTimeout(() => {

            if (bool(AdhanPlaying)) {
                storage.setItem('AdhanPlaying', "false");
            }

        }, 70000);
    }

}