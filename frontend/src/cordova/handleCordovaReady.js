// cordova/handleCordovaReady.js
export default async function handleCordovaReady() {
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }
}
