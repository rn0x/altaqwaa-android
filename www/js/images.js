/**
 * صفحة الصور
 * @module imagesPage
 */

import loadJson from './modules/loadJson.js';
import Downloader from './modules/Downloader.js';
import error_handling from './modules/error_handling.js';

/**
 * الدالة الرئيسية لعرض صفحة الصور
 * @function
 */
export default async () => {
    if (window.location.pathname === '/pages/images.html') {
        try {
            let loading = document.getElementById('loading');
            let back = document.getElementById('back');
            let alert_offline = document.getElementById('alert_offline');
            let images = document.getElementById('images');
            let images_more_button = document.getElementById('images_more_button');
            let number = 1;
            let from = 4;
            let to = 7;

            loading.style.display = "block";
            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            // التحقق من اتصال الإنترنت
            if (navigator.onLine) {
                let imagesJson = await loadJson("/data/images.json");
                let lastFourImages = imagesJson.slice(-4).reverse();

                // عرض أحدث أربع صور
                for (let item of lastFourImages) {
                    let li = document.createElement("li");
                    let images_view = document.createElement("img");
                    let images_download = document.createElement("img");

                    images.appendChild(li);
                    li.appendChild(images_view);
                    images_view.className = "images_view";

                    // Check if the image URL is valid
                    const isValidImage = await checkImageValidity(item);

                    if (isValidImage) {
                        images_view.src = item;
                    } else {
                        // Set a default image if the image is not valid
                        images_view.src = "/img/default-image.png"; // Replace with your default image path
                        images_view.alt = "Image not available";
                    }

                    li.appendChild(images_download);
                    images_download.className = "images_download";
                    images_download.src = "/img/download.png";

                    // إضافة حدث النقر لزر التحميل
                    images_download.addEventListener("click", e => {
                        Downloader(item, `${number++}.${getFormat(item)}`);
                    });
                }

                images_more_button.style.display = "block";
                loading.style.display = "none";

                // إضافة حدث النقر لزر "المزيد"
                images_more_button.addEventListener('click', async (e) => {
                    let nextImages = getNextImages(imagesJson, from, to);

                    // عرض المزيد من الصور
                    if (nextImages.length > 0) {
                        number += nextImages.length;
                        from += 4;
                        to += 4;

                        for (let item of nextImages) {
                            let li = document.createElement("li");
                            let images_view = document.createElement("img");
                            let images_download = document.createElement("img");

                            images.appendChild(li);
                            li.appendChild(images_view);
                            images_view.className = "images_view";

                            // Check if the image URL is valid
                            const isValidImage = await checkImageValidity(item);

                            if (isValidImage) {
                                images_view.src = item;
                            } else {
                                // Set a default image if the image is not valid
                                images_view.src = "/img/default-image.png"; // Replace with your default image path
                                images_view.alt = "Image not available";
                            }

                            li.appendChild(images_download);
                            images_download.className = "images_download";
                            images_download.src = "/img/download.png";

                            // إضافة حدث النقر لزر التحميل
                            images_download.addEventListener("click", e => {
                                Downloader(item, `${number++}.${getFormat(item)}`);
                            });
                        }
                    }

                    // إخفاء زر "المزيد" إذا انتهت الصور
                    setTimeout(() => {
                        if (to > imagesJson.length - 1) {
                            images_more_button.style.display = 'none';
                        }
                    }, 1000);
                });

                // التحقق من حالة الاتصال بشكل دوري
                setInterval(() => {
                    if (navigator.onLine === false) {
                        alert_offline.style.display = "block";
                        images_more_button.style.display = "none";
                        images.style.display = "none";
                    } else if (navigator.onLine) {
                        alert_offline.style.display = "none";
                        images_more_button.style.display = "block";
                        images.style.display = "block";
                    }
                }, 2000);
            } else {
                // إظهار رسالة الانقطاع عند عدم الاتصال
                alert_offline.style.display = "block";

                // إعادة التحويل إلى صفحة الصور عند استعادة الاتصال
                setInterval(() => {
                    if (navigator.onLine) {
                        window.location.href = '/pages/images.html';
                    }
                }, 1000);
            }
        } catch (error) {
            // التعامل مع الأخطاء
            error_handling(error);
        }
    }
}

/**
 * الحصول على مجموعة الصور التالية لعرضها
 * @function
 * @param {Array} arr - مصفوفة الصور الكاملة
 * @param {number} from - فهرس الصورة الأولى للعرض
 * @param {number} to - فهرس الصورة الأخيرة للعرض
 * @returns {Array} - مجموعة من الصور المقبلة
 */
function getNextImages(arr, from, to) {
    return arr.slice(-(to + 1), -(from + 1)).reverse();
}

/**
 * الحصول على تنسيق الصورة من عنوان URL
 * @function
 * @param {string} url - عنوان URL للصورة
 * @returns {string} - تنسيق الصورة
 */
function getFormat(url) {
    return url.split(".").slice(-1)[0];
}

/**
 * Check if an image exists by creating an Image object
 * @function
 * @param {string} url - Image URL
 * @returns {Promise<boolean>} - True if the image exists, false otherwise
 */
async function checkImageValidity(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}