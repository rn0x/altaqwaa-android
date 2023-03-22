export default async () => {

    if (window.location.pathname === '/more.html') {

        let more_albitaqat = document.getElementById("more_albitaqat");
        let more_hisnmuslim = document.getElementById("more_hisnmuslim");
        let more_tfs = document.getElementById("more_tfs");
        let more_radio = document.getElementById("more_radio");
        let more_allah = document.getElementById("more_allah");
        let more_images = document.getElementById("more_images");
        let more_settings = document.getElementById("more_settings");
        let more_info = document.getElementById("more_info");


        more_albitaqat.addEventListener("click", e => {

            window.location.href = "/pages/albitaqat.html"
        });

        more_hisnmuslim.addEventListener("click", e => {

            window.location.href = "/pages/hisnmuslim.html"
        });

        more_tfs.addEventListener("click", e => {

            window.location.href = "/pages/tfs.html"
        });

        more_radio.addEventListener("click", e => {

            window.location.href = "/pages/radio.html"
        });

        more_allah.addEventListener("click", e => {

            window.location.href = "/pages/allah.html"
        });

        more_images.addEventListener("click", e => {

            window.location.href = "/pages/images.html"
        });

        more_settings.addEventListener("click", e => {

            window.location.href = "/pages/settings.html"
        });

        more_info.addEventListener("click", e => {

            window.location.href = "/pages/info.html"
        });
    }

}