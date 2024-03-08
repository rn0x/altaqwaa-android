/**
 * 
 * معالج الأخطاء
 */

export default (error) => {

    let arr = [
        "application does not have sufficient geolocation permissions.",
        "Illegal Access"
    ]

    if (arr?.every(e => error?.message !== e)) {

        navigator?.notification?.confirm(
            `message: ${error?.message}\ncode: ${error?.code ? error?.code : "null"}\npath: ${window.location.pathname}`,
            (e) => {

                if (e === 2) {

                    if (navigator.app) {
                        navigator?.app?.exitApp();
                    }

                    else if (navigator.device) {
                        navigator?.device?.exitApp();
                    }

                    else {
                        window.close();
                    }

                }

                else if (e === 1) {

                    let repoUrl = 'https://github.com/Alsarmad/altaqwaa_android'
                    let message = `message: ${error?.message}\n`;
                    message += `code: ${error?.code ? error?.code : "null"}\n`;
                    message += `path: ${window.location.pathname}\n`;
                    message += `platform: ${device?.platform}\n`;
                    message += `version: ${device?.version}\n`;
                    message += `model: ${device?.model}`;

                    let url = new URL(`${repoUrl}/issues/new`);
                    url.searchParams.set("title", error?.message);
                    url.searchParams.set("body", message);
                    url.searchParams.set("labels", "bug");
                    window.open(url, "_blank");
                }
            },
            "عذراً هناك خطأ غير متوقع",
            ["الدعم", "خروج"]
        );

    }
}