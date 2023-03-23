import getGPS from './modules/getGPS.js';

export default async () => {

    if (window.location.pathname === '/pages/settings.html') {

        let storage = window.localStorage;
        let Calculation = storage.getItem('Calculation');
        //let notification = storage.getItem('notification');
        let back = document.getElementById('back');
        let alert = document.getElementById('alert');
        let settings_save = document.getElementById('settings_save');
        let refresh_location = document.getElementById("refresh_location");
        let Calculation_settings = document.getElementById('Calculation_settings');
        let selected = document.getElementById(Calculation ? Calculation : "UmmAlQura");
        //let notifications_adhan = document.getElementById("notifications_adhan");

        selected.selected = "selected"
        //notifications_adhan.checked = notification ? bool(notification) : true;

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });

        refresh_location.addEventListener('click', async (e) => {

            let GPS = await getGPS();
            let latitude = GPS.latitude;
            let longitude = GPS.longitude;

            storage.setItem("latitude", latitude);
            storage.setItem("longitude", longitude);
            alert.style.display = "block"

            setTimeout(() => {
                alert.style.display = 'none';
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
            //storage.setItem("notification", notifications_adhan.checked);


            alert.style.display = "block"

            setTimeout(() => {
                alert.style.display = 'none';
                window.location.href = "/pages/settings.html";
            }, 1000);
        });

    }
}


function bool(v) {
    return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v;
}