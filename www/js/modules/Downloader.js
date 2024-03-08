import error_handling from "./error_handling.js";

export default (url, filename) => {

    try {

        let Downloader = window?.plugins?.Downloader;
        let downloadSuccessCallback = (result) => {
            // result is an object
            console.log(result?.file);
        };

        let downloadErrorCallback = (error) => {
            // error: string
            alert(error)
        };

        let options = {
            title: filename, // 'Downloading File', // Download Notification Title
            url: url, // File Url
            path: filename, // The File Name with extension
            description: 'جاري تنزيل الملف ...', // Download description Notification String
            visible: true, // This download is visible and shows in the notifications while in progress and after completion.
            folder: "Download" // Folder to save the downloaded file, if not exist it will be created
        }

        Downloader?.download(options, downloadSuccessCallback, downloadErrorCallback);

    } catch (error) {

        error_handling(error);

    }
}