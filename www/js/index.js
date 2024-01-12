import footer from './footer.js';
import adhkar from './adhkar.js';
import prayer from './prayer.js';
import quran from './quran.js';
import more from './more.js';
import questions from './questions.js';
import albitaqat from './albitaqat.js';
import hisnmuslim from './hisnmuslim.js';
import radio from './radio.js';
import tfs from './tfs.js';
import images from './images.js';
import allah from './allah.js';
import settings from './settings.js';
import sabha from './sabha.js';
import notification from './notification.js';
import error_handling from './modules/error_handling.js';

// أفحص إذا كانت البيئة تعمل في Cordova
const isCordova = !!window.cordova;

document.documentElement.style.setProperty('--animate-duration', '1.5s');

// أضف شرطًا للتحقق مما إذا كان التطبيق يعمل في Cordova أم لا
if (isCordova) {
    document.addEventListener('deviceready', async (e) => {
        try {
            let permissions = cordova.plugins.permissions;

            let list = [
                permissions.ACCESS_COARSE_LOCATION,
                permissions.WRITE_EXTERNAL_STORAGE
            ];

            permissions.hasPermission(list, (status) => {
                if (!status.hasPermission) {
                    permissions.requestPermissions(list);
                }
            });

            if (window.MobileAccessibility) {
                window.MobileAccessibility.usePreferredTextZoom(false);
            }
        } catch (error) {
            error_handling(error);
        }
        await setupApplication();
    }, false);
} else {
    await setupApplication();
}


async function setupApplication() {
    await footer();
    await adhkar();
    await prayer();
    await quran();
    await more();
    await questions();
    await albitaqat();
    await hisnmuslim();
    await radio();
    await tfs();
    await images();
    await allah();
    await settings();
    await sabha();
    await notification();

    // احصل على جميع عناصر img
    const imagesAll = document.querySelectorAll('img');

    // تعيين خاصية loading="lazy" لكل عنصر img
    imagesAll.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}