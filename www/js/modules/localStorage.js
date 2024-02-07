/**
 * تقوم هذه الدالة بحفظ البيانات في `localStorage`.
 *
 * @param {string} key - المفتاح الذي يتم استخدامه لتخزين البيانات.
 * @param {any} data - البيانات التي ترغب في حفظها.
 *
 * @throws {Error} إذا فشلت عملية حفظ البيانات.
 */
function saveData(key, data) {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error('حدث خطأ أثناء حفظ البيانات:', error.message);
        throw error;
    }
}

/**
 * تقوم هذه الدالة باسترجاع البيانات من `localStorage`.
 *
 * @param {string} key - المفتاح الذي تم استخدامه لتخزين البيانات.
 * @returns {any} البيانات المسترجعة.
 *
 * @throws {Error} إذا فشلت عملية استرجاع البيانات.
 */
function retrieveData(key) {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return null; // إذا لم تكن هناك بيانات للاسترجاع
        }

        // استخدام typeof لفحص نوع البيانات والتعامل معها بشكل مناسب
        const dataType = typeof JSON.parse(serializedData);

        // يتم التحقق من القيم المحتملة بما في ذلك null و undefined
        if (dataType === 'object' && JSON.parse(serializedData) === null) {
            return null;
        } else if (dataType === 'undefined') {
            return undefined;
        }

        // التعامل مع البيانات حسب نوعها
        switch (dataType) {
            case 'object':
                return JSON.parse(serializedData);
            case 'number':
                return parseFloat(serializedData);
            case 'boolean':
                return serializedData === 'true';
            // يمكنك إضافة المزيد من الحالات حسب احتياجاتك
            default:
                return serializedData;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء استرجاع البيانات:', error.message);
        throw error;
    }
}

/**
 * تقوم هذه الدالة بحذف البيانات من `localStorage`.
 *
 * @param {string} key - المفتاح الذي تم استخدامه لتخزين البيانات.
 *
 * @throws {Error} إذا فشلت عملية حذف البيانات.
 */
function deleteData(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('حدث خطأ أثناء حذف البيانات:', error.message);
        throw error;
    }
}


export { saveData, retrieveData, deleteData }