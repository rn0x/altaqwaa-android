/**
 * تقوم هذه الدالة بجدولة إشعار محلي باستخدام cordova-plugin-local-notifications.
 *
 * @param {Object} options - خيارات الإشعار.
 * @throws {Error} سيتم إلقاء استثناء إذا فشل جدولة الإشعار.
 *
 * @example
 * // مثال على كيفية استخدام الدالة
 * const notificationOptions = {
 *     id: 1, // إضافة المعرف
 *     title: 'عنوان الإشعار',
 *     text: 'محتوى',
 *     icon: 'file://img/icon.png',
 *     smallIcon: 'res://drawable-xxxhdpi/ic_stat_onesignal_default.png',
 *     attachments: ['file://img/images.png'],
 *     data: { rn0x: 'ryan almalki' },
 *     led: '#00FF00',
 *     sound: "file://audio/sound.mp3",
 *     badge: 1,
 *     actions: [{ id: 'accept', title: 'Accept' }, { id: 'reject', title: 'Reject' }], // إضافة الإجراءات
 *     trigger: { in: 1, unit: 'minute' }, // إضافة المشغل
 * };
 *
 * scheduleLocalNotification(notificationOptions);
 */

export function scheduleLocalNotification(options) {

    try {
        if (!options || typeof options !== 'object') {
            throw new Error('تم تقديم خيارات غير صالحة لجدولة الإشعار.');
        }

        // التحقق من وجود cordova.plugins.notification.local
        if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.notification) {
            throw new Error('يجب تشغيل هذا الكود داخل تطبيق Cordova وبعد استعراض الأجهزة.');
        }

        // options.actions = [{ id: 'dummyAction', title: 'close', type: 'button' }];

        cordova?.plugins?.notification?.local?.schedule(options);
    } catch (error) {
        console.error('حدث خطأ في جدولة الإشعار:', error.message);
        throw error;
    }
}


/**
 * تحديث إشعار محلي باستخدام cordova-plugin-local-notifications.
 *
 * @param {number} notificationId - معرف الإشعار الذي تريد تحديثه.
 * @param {Object} options - الخصائص الجديدة التي تريد تحديثها.
 * @throws {Error} سيتم إلقاء استثناء إذا فشل تحديث الإشعار.
 * 
 * @example
 *
const updatedOptions = {
    title: 'عنوان الإشعار المحدث',
    text: 'محتوى المحدث',
    // وغيرها من الخصائص التي تريد تحديثها
};

updateLocalNotification(1, updatedOptions);

 */
export function updateLocalNotification(notificationId, options) {
    try {
        if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.notification) {
            throw new Error('يجب تشغيل هذا الكود داخل تطبيق Cordova وبعد استعراض الأجهزة.');
        }

        if (!notificationId || typeof notificationId !== 'number') {
            throw new Error('معرف الإشعار غير صالح.');
        }

        if (!options || typeof options !== 'object') {
            throw new Error('الخيارات المقدمة غير صالحة لتحديث الإشعار.');
        }

        cordova?.plugins?.notification?.local?.update({
            id: notificationId,
            ...options,
        });
    } catch (error) {
        console.error('حدث خطأ في تحديث الإشعار المحلي:', error.message);
        throw error;
    }
}

/**
 * إلغاء إشعار محلي بواسطة معرف الإشعار.
 * 
 * @param {number} notificationId - معرف الإشعار الذي تريد إلغاؤه.
 * @param {Function} [callback=()=>{}] - دالة التابعية التي تُستدعى عند الانتهاء من إلغاء الإشعار.
 */
export function cancelLocalNotification(notificationId, callback = () => { }) {
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification) {
        cordova?.plugins?.notification?.local?.cancel(notificationId, callback);
    }
}


/**
 * تحقق مما إذا كان إشعارًا محليًا موجودًا باستخدام معرف الإشعار.
 * 
 * @param {number} notificationId - معرف الإشعار الذي تريد التحقق من وجوده.
 * @returns {boolean} - القيمة المعادة تحدد ما إذا كان الإشعار موجودًا أم لا.
 */
export function isLocalNotificationExists(notificationId) {
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification) {
        return cordova?.plugins?.notification?.local?.isPresent(notificationId);
    }
    return false;
}

/**
 * تسجيل الحدث للاستماع إلى النقر على الإشعارات المحلية والتحقق من الإجراء المطلوب.
 * 
 * @param {Function} callback - دالة التابعية التي تستجيب للحدث.
 */
export function registerLocalNotificationClickEvent(callback) {
    try {
        if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.notification) {
            throw new Error('يجب تشغيل هذا الكود داخل تطبيق Cordova وبعد استعراض الأجهزة.');
        }

        cordova?.plugins?.notification?.local?.on('click', function (notification) {
            // التحقق من أن النقر تم على الإجراء المطلوب
            if (notification.action === 'closeAudio') {
                callback(notification);
            }
        });
    } catch (error) {
        console.error('حدث خطأ في تسجيل الحدث للاستماع إلى النقر على الإشعارات المحلية:', error.message);
        throw error;
    }
}


/**
 * تسجيل الحدث للاستماع إلى النقر على الإشعارات المحلية والتحقق من الإجراء المطلوب.
 * 
 * @param {String} actionID - معرف الإجراء او الحدث.
 * @param {Function} [callback=()=>{}] - دالة التابعية التي تُستدعى عند الضغط على الإشعار.
 */
export function ClickEvent(actionID, callback) {
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification) {
        cordova?.plugins?.notification?.local?.on(actionID, callback);
    }
    return false;
}
