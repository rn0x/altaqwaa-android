import {
    scheduleLocalNotification,
    updateLocalNotification,
    cancelLocalNotification,
    isLocalNotificationExists,
    ClickEvent
} from "./LocalNotification.js";

/**
 * تشغيل أو إيقاف التشغيل لملف صوتي باستخدام localStorage للحفاظ على حالة التشغيل والاستماع السابق.
 * @param {string} linkAudio رابط الملف الصوتي
 */
export default async function handleAudio() {
    try {
        // جلب حالة التشغيل من localStorage
        const isMediaPlay = localStorage.getItem('isMediaPlay') === 'true';
        const isPaused = localStorage.getItem('isPaused') === 'true';
        const AudioName = localStorage.getItem('AudioName');
        const isMediaPlayStorage = (value) => { localStorage.setItem('isMediaPlay', `${value}`) };
        const audioCurrentTimeStorage = (value) => { localStorage.setItem('audioCurrentTime', `${value}`) };
        const isPausedStorage = (value) => { localStorage.setItem('isPaused', `${value}`) };
        const audioCurrentTime = localStorage.getItem('audioCurrentTime');
        const linkAudio = localStorage.getItem('linkAudio');
        const AudioNameStoarge = (value) => { localStorage.setItem('AudioName', `${value}`) };

        // تحقق مما إذا كان هناك رابط صوتي محدد وإلا فلا داعي للاستمرار
        if (!linkAudio || linkAudio === "") {
            console.log("لا يوجد رابط صوتي محدد.");
            return;
        }

        const notificationId = 222; // معرف الإشعار
        const actionID = "pause_audio"; // معرف الإجراء

        // إنشاء مرجع للتحكم في تكرار التحديثات الزمنية
        let intervalReference;

        // إنشاء عنصر الصوت
        const audio = new Audio(linkAudio);
        // التحقق من حالة التشغيل وتوقيف التشغيل إذا كان متوقفا وموقفا في localStorage
        setInterval(() => {
            const isMediaPlay = localStorage.getItem('isMediaPlay') === 'true';
            const isPaused = localStorage.getItem('isPaused') === 'true';
            if (!isMediaPlay && isPaused) {
                console.log("التشغيل متوقف.");
                audio.pause();
                audioCurrentTimeStorage(0);
                clearInterval(intervalReference);
                cancelLocalNotification(notificationId, () => { });
            }
        }, 1000);

        // إذا كان الملف صوتي قيد التشغيل ولم يتم إيقاف التشغيل
        if (isMediaPlay && !isPaused) {
            // استئناف التشغيل من نفس الموقع
            if (audioCurrentTime) {
                audio.currentTime = parseFloat(audioCurrentTime);
            }
            await audio.play();
            isPausedStorage(false);
            intervalReference = setInterval(() => {
                console.log("الوقت الحالي للصوت: ", audio.currentTime);
                audioCurrentTimeStorage(audio.currentTime);
            }, 1000);

            const isNotificationExists = isLocalNotificationExists(notificationId); // تحقق مما إذا كان إشعارًا محليًا موجودًا باستخدام معرف الإشعار.

            if (!isNotificationExists) {
                scheduleLocalNotification({
                    id: notificationId,
                    text: `${AudioName}`,
                    smallIcon: 'res://drawable-xxxhdpi/ic_stat_onesignal_default.png',
                    badge: 1,
                    actions: [{ id: actionID, title: 'إيقاف' }],
                });
            }

            else {
                updateLocalNotification(notificationId, {
                    id: notificationId,
                    text: `${AudioName}`,
                    smallIcon: 'res://drawable-xxxhdpi/ic_stat_onesignal_default.png',
                    badge: 1,
                    actions: [{ id: actionID, title: 'إيقاف' }],
                });
            }



        } else if (!isMediaPlay && !isPaused) {
            // إيقاف الصوت إذا كان قيد التشغيل
            audio.pause();
            isPausedStorage(true);
            audioCurrentTimeStorage(0);
            clearInterval(intervalReference);
            cancelLocalNotification(notificationId, () => { });
        }


        ClickEvent(actionID, () => {
            audio.pause();
            isPausedStorage(true);
            audioCurrentTimeStorage(0);
            clearInterval(intervalReference);
            cancelLocalNotification(notificationId, () => { });
        })

        // حفظ حالة التشغيل والاستماع الحالية في localStorage قبل تفريغ الصفحة
        window.onbeforeunload = () => {
            const isMediaPlay = localStorage.getItem('isMediaPlay') === 'true';
            const isPaused = localStorage.getItem('isPaused') === 'true';
            const audioCurrentTime = localStorage.getItem('audioCurrentTime');
            isMediaPlayStorage(isMediaPlay);
            isPausedStorage(isPaused);
            if (isMediaPlay && !isPaused) {
                audioCurrentTimeStorage(audioCurrentTime);
            }
        };
    } catch (error) {
        console.error("حدث خطأ: ", error);
    }
}
