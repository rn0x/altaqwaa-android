import adhanModule from './modules/adhanModule.js';
import getGPS from './modules/getGPS.js';
import error_handling from './modules/error_handling.js';

export default async () => {

    if (window.location.pathname === '/prayer.html') {

        try {

            let statusPERM = await permission_status();
            let prayer_time = document.getElementById('prayer_time');
            let alertElm = document.getElementById('alert');

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

            if (statusPERM || Getlongitude && Getlatitude) {

                prayer_time.style.display = "block";

                if (Getlongitude === null || Getlatitude === null) {

                    let GPS = await getGPS();
                    Getlatitude = GPS.latitude;
                    Getlongitude = GPS.longitude;
                    storage.setItem("latitude", Getlatitude);
                    storage.setItem("longitude", Getlongitude);

                }

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
                let data_hijri = document.getElementById('data_hijri');
                let data_Gregorian = document.getElementById('data_Gregorian');
                let datoday = document.getElementById('datoday');
                let country = document.getElementById('country');
                let hour_minutes = document.getElementById('hour_minutes');
                let seconds = document.getElementById('seconds');
                let time_fajr = document.getElementById('time_fajr');
                let time_dhuhr = document.getElementById('time_dhuhr');
                let time_asr = document.getElementById('time_asr');
                let time_maghrib = document.getElementById('time_maghrib');
                let time_isha = document.getElementById('time_isha');
                let fajr_li = document.getElementById('fajr_li');
                let dhuhr_li = document.getElementById('dhuhr_li');
                let asr_li = document.getElementById('asr_li');
                let maghrib_li = document.getElementById('maghrib_li');
                let isha_li = document.getElementById('isha_li');
                let remaining_ = document.getElementById('remaining');
                let remaining_time = document.getElementById('remaining_time');
                let remaining_name = document.getElementById('remaining_name');
                let fajr = document.getElementById('fajr');
                let dhuhr = document.getElementById('dhuhr');
                let asr = document.getElementById('asr');
                let maghrib = document.getElementById('maghrib');
                let isha = document.getElementById('isha');

                data_hijri.innerText = adhan.data_hijri;
                data_Gregorian.innerText = adhan.data_Gregorian;
                datoday.innerText = adhan.today;
                hour_minutes.innerText = adhan.hour_minutes;
                seconds.innerText = adhan.seconds;
                country.innerHTML = `المنطقة الزمنية: <span id="city">${adhan.timezone}</span>`
                remaining_time.innerText = adhan.remainingNext;
                time_fajr.innerText = adhan.fajr;
                time_dhuhr.innerText = adhan.dhuhr;
                time_asr.innerText = adhan.asr;
                time_maghrib.innerText = adhan.maghrib;
                time_isha.innerText = adhan.isha;


                setInterval(() => {

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
                    data_hijri.innerText = adhan.data_hijri;
                    data_Gregorian.innerText = adhan.data_Gregorian;
                    datoday.innerText = adhan.today;
                    hour_minutes.innerText = adhan.hour_minutes;
                    seconds.innerText = adhan.seconds;
                    country.innerHTML = `المنطقة الزمنية: <span id="city">${adhan.timezone}</span>`

                    remaining_time.innerText = adhan.remainingNext;
                    time_fajr.innerText = adhan.fajr;
                    time_dhuhr.innerText = adhan.dhuhr;
                    time_asr.innerText = adhan.asr;
                    time_maghrib.innerText = adhan.maghrib;
                    time_isha.innerText = adhan.isha;

                    switch (adhan.nextPrayer) {
                        case "fajr":
                            remaining_name.innerText = "الفجر";
                            remaining_.style.display = 'block'
                            remaining_time.style.display = 'block'
                            fajr_li.style.background = 'var(--background_div_hover)'
                            fajr_li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            dhuhr_li.style.background = null
                            dhuhr_li.style.boxShadow  = null
                            asr_li.style.background = null
                            asr_li.style.boxShadow  = null
                            maghrib_li.style.background = null
                            maghrib_li.style.boxShadow  = null
                            isha_li.style.background = null
                            isha_li.style.boxShadow  = null
                            fajr.style.color = 'var(--white-div)'
                            dhuhr.style.color = null
                            asr.style.color = null
                            maghrib.style.color = null
                            isha.style.color = null
                            break;

                        case "dhuhr":
                            remaining_name.innerText = "الظهر";
                            remaining_.style.display = 'block'
                            remaining_time.style.display = 'block'
                            fajr_li.style.background = null
                            fajr_li.style.boxShadow  = null
                            dhuhr_li.style.background = 'var(--background_div_hover)'
                            dhuhr_li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            asr_li.style.background = null
                            asr_li.style.boxShadow  = null
                            maghrib_li.style.background = null
                            maghrib_li.style.boxShadow  = null
                            isha_li.style.background = null
                            isha_li.style.boxShadow  = null
                            fajr.style.color = null
                            dhuhr.style.color = 'var(--white-div)'
                            asr.style.color = null
                            maghrib.style.color = null
                            isha.style.color = null
                            break;

                        case "asr":
                            remaining_name.innerText = "العصر";
                            remaining_.style.display = 'block'
                            remaining_time.style.display = 'block'
                            fajr_li.style.background = null
                            fajr_li.style.boxShadow  = null
                            dhuhr_li.style.background = null
                            dhuhr_li.style.boxShadow  = null
                            asr_li.style.background = 'var(--background_div_hover)'
                            asr_li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            maghrib_li.style.background = null
                            maghrib_li.style.boxShadow  = null
                            isha_li.style.background = null
                            isha_li.style.boxShadow  = null
                            fajr.style.color = null
                            dhuhr.style.color = null
                            asr.style.color = 'var(--white-div)'
                            maghrib.style.color = null
                            isha.style.color = null
                            break;

                        case "maghrib":
                            remaining_name.innerText = "المغرب";
                            remaining_.style.display = 'block'
                            remaining_time.style.display = 'block'
                            fajr_li.style.background = null
                            fajr_li.style.boxShadow  = null
                            dhuhr_li.style.background = null
                            dhuhr_li.style.boxShadow  = null
                            asr_li.style.background = null
                            asr_li.style.boxShadow  = null
                            maghrib_li.style.background = 'var(--background_div_hover)'
                            maghrib_li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            isha_li.style.background = null
                            isha_li.style.boxShadow  = null
                            fajr.style.color = null
                            dhuhr.style.color = null
                            asr.style.color = null
                            maghrib.style.color = 'var(--white-div)'
                            isha.style.color = null
                            break;

                        case "isha":
                            remaining_name.innerText = "العشاء";
                            remaining_.style.display = 'block'
                            remaining_time.style.display = 'block'
                            fajr_li.style.background = null
                            fajr_li.style.boxShadow  = null
                            dhuhr_li.style.background = null
                            dhuhr_li.style.boxShadow  = null
                            asr_li.style.background = null
                            asr_li.style.boxShadow  = null
                            maghrib_li.style.background = null
                            maghrib_li.style.boxShadow  = null
                            isha_li.style.background = 'var(--background_div_hover)'
                            isha_li.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            fajr.style.color = null
                            dhuhr.style.color = null
                            asr.style.color = null
                            maghrib.style.color = null
                            isha.style.color = 'var(--white-div)'
                            break;

                        default:
                            remaining_name.innerText = "لايوجد";
                            remaining_.style.display = 'none'
                            remaining_time.style.display = 'none'
                            fajr_li.style.background = null
                            fajr_li.style.boxShadow  = null
                            dhuhr_li.style.background = null
                            dhuhr_li.style.boxShadow  = null
                            asr_li.style.background = null
                            asr_li.style.boxShadow  = null
                            maghrib_li.style.background = null
                            maghrib_li.style.boxShadow  = null
                            isha_li.style.background = null
                            isha_li.style.boxShadow  = null
                            fajr.style.color = null
                            dhuhr.style.color = null
                            asr.style.color = null
                            maghrib.style.color = null
                            isha.style.color = null
                            break;
                    }


                }, 1000);

                setInterval(() => {

                    let Getlatitude = storage.getItem('latitude');
                    let Getlongitude = storage.getItem('longitude');

                    if (statusPERM || Getlongitude && Getlatitude) {
                        prayer_time.style.display = "block";
                        alertElm.style.display = "none";
                    }

                    else {
                        prayer_time.style.display = "none";
                        alertElm.style.display = "block";
                    }

                }, 2000);

            }

            else {

                prayer_time.style.display = "none";
                alertElm.style.display = "block";

                setInterval(() => {

                    let Getlatitude = storage.getItem('latitude');
                    let Getlongitude = storage.getItem('longitude');

                    if (statusPERM || Getlongitude && Getlatitude) {

                        window.location = '/prayer.html';
                    }

                }, 2000);

            }

        } catch (error) {

            error_handling(error);

        }

    }
}


async function permission_status() {

    return new Promise((resolve, reject) => {
        let permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, (status) => {

            if (status.hasPermission) {

                resolve(true)
            }

            else {
                resolve(false)
            }

        });
    });
}