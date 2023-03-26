import footer from './footer.js';
import adhkar from './adhkar.js';
import prayer from './prayer.js';
import quran from './quran.js';
import more from './more.js';
import albitaqat from './albitaqat.js';
import hisnmuslim from './hisnmuslim.js';
import radio from './radio.js';
import tfs from './tfs.js';
import images from './images.js';
import allah from './allah.js';
import settings from './settings.js';
import notification from './notification.js';

document.documentElement.style.setProperty('--animate-duration', '1.5s');




document.addEventListener('deviceready', async (e) => {

    let permissions = cordova.plugins.permissions;

    // الصلاحيات

    let list = [
        permissions.ACCESS_COARSE_LOCATION,
        permissions.WRITE_EXTERNAL_STORAGE,
        permissions.INTERNET,
    ];

    permissions.hasPermission(list, (status) => {

        if (!status.hasPermission) {

            permissions.requestPermissions(list);
        }

    });

    // ignore the system font preferences

    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }

}, false);

await footer();
await adhkar();
await prayer()
await quran();
await more();
await albitaqat();
await hisnmuslim();
await radio();
await tfs();
await images();
await allah();
await settings();
await notification();