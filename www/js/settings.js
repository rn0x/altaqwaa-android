import getGPS from './modules/getGPS.js';

export default async () => {

    if (window.location.pathname === '/pages/settings.html') {

        let storage = window.localStorage;
        let Calculation = storage.getItem('Calculation');
        let Shafaq = storage.getItem('Shafaq');
        let Madhab = storage.getItem('Madhab');
        let notification = storage.getItem('notification');
        let Setfajr = storage.getItem('fajr');
        let Setdhuhr = storage.getItem('dhuhr');
        let Setasr = storage.getItem('asr');
        let Setmaghrib = storage.getItem('maghrib');
        let Setisha = storage.getItem('isha');
        let back = document.getElementById('back');
        let alert_el = document.getElementById('alert');
        let settings_save = document.getElementById('settings_save');
        let refresh_location = document.getElementById("refresh_location");
        let Calculation_settings = document.getElementById('Calculation_settings');
        let selected_Calculation = document.getElementById(Calculation ? Calculation : "UmmAlQura");
        let selected_Shafaq = document.getElementById(Shafaq ? Shafaq : "General");
        let selected_Madhab = document.getElementById(Madhab ? Madhab : "Shafi");
        let notifications_adhan = document.getElementById("notifications_adhan");
        let Shafaq_settings = document.getElementById("Shafaq_settings");
        let madhab_settings = document.getElementById("madhab_settings");
        let settings_fajr = document.getElementById("settings_fajr");
        let settings_dhuhr = document.getElementById("settings_dhuhr");
        let settings_asr = document.getElementById("settings_asr");
        let settings_maghrib = document.getElementById("settings_maghrib");
        let settings_isha = document.getElementById("settings_isha");

        // default value ( checked or selected or input )

        selected_Calculation.selected = "selected";
        selected_Shafaq.selected = "selected";
        selected_Madhab.selected = "selected";
        notifications_adhan.checked = notification ? bool(notification) : true;
        settings_fajr.value = Setfajr ? Number(Setfajr) : 0;
        settings_dhuhr.value = Setfajr ? Number(Setdhuhr) : 0;
        settings_asr.value = Setfajr ? Number(Setasr) : 0;
        settings_maghrib.value = Setfajr ? Number(Setmaghrib) : 0;
        settings_isha.value = Setfajr ? Number(Setisha) : 0;

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });

        refresh_location.addEventListener('click', async (e) => {

            let GPS = await getGPS();
            let latitude = GPS.latitude;
            let longitude = GPS.longitude;

            storage.setItem("latitude", latitude);
            storage.setItem("longitude", longitude);
            alert_el.style.display = "block"

            setTimeout(() => {
                alert_el.style.display = 'none';
                window.location.href = "/pages/settings.html";
            }, 1000);

        });


        settings_save.addEventListener("click", async e => {



            let GPS = await getGPS();
            let latitude = GPS.latitude;
            let longitude = GPS.longitude;

            storage.setItem("latitude", latitude);
            storage.setItem("longitude", longitude);
            storage.setItem("Calculation", Calculation_settings.value);
            storage.setItem("Shafaq", Shafaq_settings.value);
            storage.setItem("Madhab", madhab_settings.value);
            storage.setItem("notification", notifications_adhan.checked);

            if (settings_fajr.value.length !== 0) {
                storage.setItem("fajr", settings_fajr.value);
            }

            if (settings_dhuhr.value.length !== 0) {
                storage.setItem("dhuhr", settings_dhuhr.value);
            }

            if (settings_asr.value.length !== 0) {
                storage.setItem("asr", settings_asr.value);
            }

            if (settings_maghrib.value.length !== 0) {
                storage.setItem("maghrib", settings_maghrib.value);
            }

            if (settings_isha.value.length !== 0) {
                storage.setItem("isha", settings_isha.value);
            }


            alert_el.style.display = "block"

            setTimeout(() => {
                alert_el.style.display = 'none';
                window.location.href = "/pages/settings.html";
            }, 1000);
        });

    }
}


function bool(v) {
    return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v;
}