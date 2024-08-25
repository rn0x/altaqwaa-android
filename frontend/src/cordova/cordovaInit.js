// cordova/cordovaInit.js
import handleCordovaReady from './handleCordovaReady';

function onDeviceReady() {
    handleCordovaReady().catch(error => {
        console.error('Error handling Cordova ready:', error);
    });
}

// تأكد من أن Cordova جاهز
if (window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    console.warn('Cordova is not available.');
}
