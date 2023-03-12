import footer from './footer.js';
import adhkar from './adhkar.js';
import prayer from './prayer.js';

document.addEventListener('deviceready', async (e) => {

    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("manufacturer").innerHTML = device.manufacturer;
    document.getElementById("isVirtual").innerHTML = device.isVirtual;
    document.getElementById("serial").innerHTML = device.serial;
    document.getElementById("cordova").innerHTML = device.cordova;
    document.getElementById("model").innerHTML = device.model;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.model;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;

}, false);

await footer();
await adhkar();
await prayer()


// Return to the Adhkar page

if (
    window.location.pathname === '/pages/adhkar/morning.html' ||
    window.location.pathname === '/pages/adhkar/evening.html' ||
    window.location.pathname === '/pages/adhkar/food.html' ||
    window.location.pathname === '/pages/adhkar/prayer.html' ||
    window.location.pathname === '/pages/adhkar/sleeping.html' ||
    window.location.pathname === '/pages/adhkar/tasbih.html'
) {

    let back = document.getElementById('back');
    back.addEventListener('click', e => {
        window.location.href = '/index.html'
    });

}