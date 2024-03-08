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
import ramadanTime from './ramadanTime.js';
import error_handling from './modules/error_handling.js';
import handleAudio from './modules/handleAudio.js';

document.documentElement.style.setProperty('--animate-duration', '1.5s');

document.addEventListener('deviceready', async (event) => {
    event.preventDefault();
    setTheme();
    try {
        const permissions = cordova?.plugins?.permissions;
        const list = [
            permissions?.ACCESS_COARSE_LOCATION,
            permissions?.WRITE_EXTERNAL_STORAGE,
            permissions?.VIBRATE,
            permissions?.POST_NOTIFICATIONS,
            permissions?.SCHEDULE_EXACT_ALARM
        ];
        permissions?.hasPermission(list, (status) => {
            if (!status.hasPermission) {
                permissions?.requestPermissions(list);
            }
        });
        if (window.MobileAccessibility) {
            window.MobileAccessibility.usePreferredTextZoom(false);
        }
    } catch (error) {
        error_handling(error);
    }

    // قم بإضافة تعليق في حال تغشيل التطبيق في المتصفح
    await setupApplication();

}, false);


// قم بإزالة التعليق في حال تغشيل التطبيق في المتصفح
// await setupApplication();

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
    await ramadanTime();

    // احصل على جميع عناصر img
    const imagesAll = document.querySelectorAll('img');

    // تعيين خاصية loading="lazy" لكل عنصر img
    imagesAll?.forEach(img => {
        img?.setAttribute('loading', 'lazy');
    });

    await handleAudio(); // تشغيل الصوت في جميع الصفحات

}


function setTheme() {
    const storage = window.localStorage;
    const getTheme = storage.getItem("themeStorage");

    if (getTheme === "theme_1" || getTheme === undefined) {
        NavigationBar.backgroundColorByHexString("#232527", false);
        StatusBar.backgroundColorByHexString('#2e3338');
        document.querySelector("html").setAttribute("data-theme", "theme_1");
    }
    if (getTheme === "theme_2") {
        NavigationBar.backgroundColorByHexString("#0c1128", false);
        StatusBar.backgroundColorByHexString('#141e46');
        document.querySelector("html").setAttribute("data-theme", "theme_2");
    }
    if (getTheme === "theme_3") {
        NavigationBar.backgroundColorByHexString("#262723", false);
        StatusBar.backgroundColorByHexString('#38382e');
        document.querySelector("html").setAttribute("data-theme", "theme_3");
    }
    if (getTheme === "theme_4") {
        NavigationBar.backgroundColorByHexString("#94b0ff", false);
        StatusBar.backgroundColorByHexString('#acc2fd');
        document.querySelector("html").setAttribute("data-theme", "theme_4");
    }
    if (getTheme === "theme_5") {
        NavigationBar.backgroundColorByHexString("#0b3f43", false);
        StatusBar.backgroundColorByHexString('#0b3f43');
        document.querySelector("html").setAttribute("data-theme", "theme_5");
    }
}