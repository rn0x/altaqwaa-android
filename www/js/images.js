import loadJson from './modules/loadJson.js';
import Downloader from './modules/Downloader.js';
import error_handling from './modules/error_handling.js';

export default async () => {

    if (window.location.pathname === '/pages/images.html') {

        try {

            let back = document.getElementById('back');
            let alert_offline = document.getElementById('alert_offline');


            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            if (navigator.onLine) {

                let imagesJson = await loadJson("/data/images.json");
                let images = document.getElementById('images');
                let images_more_button = document.getElementById('images_more_button');
                let number = 1;
                let from = 4;
                let to = 7;
                let [A1] = imagesJson.slice(-1);
                let [A2] = imagesJson.slice(-2);
                let [A3] = imagesJson.slice(-3);
                let [A4] = imagesJson.slice(-4);
                let Arr = [A1, A2, A3, A4];

                for (let item of Arr) {

                    let format = item?.split(".").slice(-1)[0];
                    let li = document.createElement("li");
                    let images_view = document.createElement("img");
                    let images_download = document.createElement("img");

                    images.appendChild(li);
                    li.appendChild(images_view);
                    images_view.className = "images_view"
                    images_view.src = item;
                    li.appendChild(images_download);
                    images_download.className = "images_download"
                    images_download.src = "/img/download.png"

                    images_download.addEventListener("click", e => {
                        Downloader(item, `${number++}.${format}`);
                    });
                }

                images_more_button.style.display = "block"

                images_more_button.addEventListener('click', (e) => {

                    let GetArray = getFromTo(imagesJson.slice().reverse(), from, to);

                    if (to < imagesJson?.length) {

                        number = number++
                        from += 4
                        to += 4

                        for (let item of GetArray) {

                            let format = item?.split(".").slice(-1)[0];
                            let li = document.createElement("li");
                            let images_view = document.createElement("img");
                            let images_download = document.createElement("img");

                            images.appendChild(li);
                            li.appendChild(images_view);
                            images_view.className = "images_view"
                            images_view.src = item;
                            li.appendChild(images_download);
                            images_download.className = "images_download"
                            images_download.src = "/img/download.png"

                            images_download.addEventListener("click", e => {
                                Downloader(item, `${number++}.${format}`);
                            });

                        }
                    }

                    setTimeout(() => {
                        if (to > imagesJson.length - 1) {
                            images_more_button.style.display = 'none'
                        }
                    }, 1000);

                });

                setInterval(() => {

                    if (navigator.onLine === false) {
                        alert_offline.style.display = "block"
                        images_more_button.style.display = "none"
                        images.style.display = "none"
                    }

                    else if (navigator.onLine) {
                        alert_offline.style.display = "none"
                        images_more_button.style.display = "block"
                        images.style.display = "block"
                    }

                }, 2000);


            }

            else {
                alert_offline.style.display = "block"

                setInterval(() => {

                    if (navigator.onLine) {
                        window.location.href = '/pages/images.html';
                    }

                }, 1000);
            }

        } catch (error) {

            error_handling(error);

        }

    }
}

function getFromTo(arr, from, to) {

    let result = [];
    if (to > (arr.length - 1)) to = arr.length - 1;
    for (var i = from; i <= to; i++) {
        result.push(arr[i])
    }

    return result;
}