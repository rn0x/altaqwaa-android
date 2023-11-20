import error_handling from './modules/error_handling.js';
import loadJson from './modules/loadJson.js';

export default async () => {
    let storage = window.localStorage;

    if (window.location.pathname === '/index.html') {

        try {

            let adhkarJson = await loadJson('/data/adhkar.json');
            let adhkar_random_text = document.getElementById('adhkar_random_text');
            let adhkar_random_description = document.getElementById('adhkar_random_description');
            let adhkar_random_reference = document.getElementById('adhkar_random_reference');
            let adhkar_random_copy = document.getElementById('adhkar_random_copy');
            let adhkar_random_bt = document.getElementById('adhkar_random_bt');
            let alert = document.getElementById('alert');
            let adhkar_random = adhkarJson[Math.floor(Math.random() * adhkarJson.length)];
            let storage = window.localStorage;
            let adhkar_database = storage.getItem('adhkar_database');
            let adhkar_database_number = document.getElementById("adhkar_database_number");

            adhkar_database_number.innerText = adhkar_database ? adhkar_database : 0;
            adhkar_random_text.innerText = adhkar_random?.zekr;
            adhkar_random_description.innerText = adhkar_random?.description;
            adhkar_random_reference.innerText = adhkar_random?.reference;

            // random button 
            adhkar_random_bt.addEventListener("click", (e) => {
                let adhkar_random = adhkarJson[Math.floor(Math.random() * adhkarJson.length)];
                adhkar_random_text.innerText = adhkar_random?.zekr;
                adhkar_random_description.innerText = adhkar_random?.description;
                adhkar_random_reference.innerText = adhkar_random?.reference;
            });

            // copy button 
            adhkar_random_copy.addEventListener("click", (e) => {

                let text = `${adhkar_random_text.innerText}`
                text += adhkar_random_description.innerText !== '' ? `\n\n${adhkar_random_description.innerText}` : adhkar_random_description.innerText;
                text += adhkar_random_reference.innerText !== '' ? `\n\n${adhkar_random_reference.innerText}` : adhkar_random_description.innerText;
                cordova.plugins.clipboard.copy(text);

                alert.style.display = "block"
                setTimeout(() => {
                    alert.style.display = 'none'
                }, 1000);

            });


            // pages adhkar
            let morning = document.getElementById('morning');
            let evening = document.getElementById('evening');
            let sleeping = document.getElementById('sleeping');
            let food = document.getElementById('food');
            let prayers = document.getElementById('prayers');
            let tasbih = document.getElementById('tasbih');

            morning.addEventListener('click', e => window.location.href = '/pages/adhkar/morning.html');
            evening.addEventListener('click', e => window.location.href = '/pages/adhkar/evening.html');
            sleeping.addEventListener('click', e => window.location.href = '/pages/adhkar/sleeping.html');
            food.addEventListener('click', e => window.location.href = '/pages/adhkar/food.html');
            prayers.addEventListener('click', e => window.location.href = '/pages/adhkar/prayer.html');
            tasbih.addEventListener('click', e => window.location.href = '/pages/adhkar/tasbih.html');


            // حدث زر الرجوع للخلف 
            document.addEventListener("backbutton", async function (e) {
                e.preventDefault(); // منع السلوك الافتراضي لزر الرجوع
                storage.removeItem('audioPlayingId');
                storage.removeItem('icon_audio');
                storage.removeItem('AdhanPlaying');

                navigator?.notification?.confirm(
                    'هل بالفعل تريد الخروج من التطبيق ؟',  // message
                    (e) => {

                        if (e === 2) {

                            if (navigator?.app) {
                                navigator.app.exitApp();
                            }

                            else if (navigator?.device) {
                                navigator.device.exitApp();
                            }

                            else {
                                window.close();
                            }

                        }

                        else if (e === 1) {
                            window.open("https://play.google.com/store/apps/details?id=com.rn0x.altaqwaa", "_blank");
                        }
                    },         // callback
                    'خروج',            // title
                    ['تقييم التطبيق', 'خروج']                 // buttonName
                );

            }, false);

        } catch (error) {

            error_handling(error);
        }
    }

    let adhkarMenuJson = await loadJson('/data/adhkarMenu.json');
    let adhkarKey = Object.keys(adhkarMenuJson);
    let content = document.getElementById('content');
    for (let item of adhkarKey) {
        if (window.location.pathname === `/pages/adhkar/${item}.html`) {

            let loading = document.getElementById('loading');
            loading.style.display = "block";
            let adhkarJson = adhkarMenuJson[item];


            for (const iterator of adhkarJson?.array) {
                let adhkar = document.createElement("div");
                let text = document.createElement("p");
                let text_description = document.createElement("p");
                let text_source = document.createElement("p");
                let copy_and_paste = document.createElement("ul");
                let repetition = document.createElement("li");
                let count = document.createElement("p");
                let repetition_number = document.createElement("p");
                let icon_copy_adhkar = document.createElement("img");
                let icon_repetition_adhkar = document.createElement("img");

                content.appendChild(adhkar);
                adhkar.className = "adhkar";
                adhkar.appendChild(text);
                text.className = "text";
                text.innerText = iterator?.adhkar;
                adhkar.appendChild(text_description);
                text_description.className = "text_description";
                text_description.innerText = iterator?.description;
                adhkar.appendChild(text_source);
                text_source.className = "text_source";
                text_source.innerText = iterator?.source;
                adhkar.appendChild(copy_and_paste);
                copy_and_paste.className = "copy_and_paste";
                copy_and_paste.appendChild(repetition);
                repetition.className = "repetition";
                repetition.appendChild(count);
                count.className = "count";
                count.innerText = "التكرار: ";
                repetition.appendChild(repetition_number);
                repetition_number.className = "repetition_number";
                repetition_number.innerText = iterator?.repetition;
                adhkar.appendChild(icon_copy_adhkar);
                icon_copy_adhkar.className = "icon_copy_adhkar";
                icon_copy_adhkar.src = "/img/copy.png";
                adhkar.appendChild(icon_repetition_adhkar);
                icon_repetition_adhkar.className = "icon_repetition_adhkar";
                icon_repetition_adhkar.src = "/img/repetition.svg";


                adhkar.addEventListener("click", () => {

                    let GetAdhkarRepeat = storage.getItem("adhkarRepeat");

                    if (parseInt(repetition_number.innerText) > 0) {
                        let value = parseInt(repetition_number.innerText) - 1;
                        repetition_number.innerText = value;
                        if (parseInt(repetition_number.innerText) === 0) {
                            copy_and_paste.style.backgroundColor = "var(--background_div_hover_2)";
                            copy_and_paste.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset';
                            repetition_number.style.color = 'var(--white)';
                        }

                        if (!GetAdhkarRepeat || isNaN(GetAdhkarRepeat)) {
                            GetAdhkarRepeat = 0;
                        }

                        storage.setItem("adhkarRepeat", parseInt(GetAdhkarRepeat) + 1)
                    }
                });

                icon_repetition_adhkar.addEventListener("click", (event) => {
                    event.stopPropagation();
                    repetition_number.innerText = iterator?.repetition;
                    copy_and_paste.style.backgroundColor = "";
                    copy_and_paste.style.boxShadow = '';
                    repetition_number.style.color = '';
                });
                icon_copy_adhkar.addEventListener("click", (event) => {
                    let alert = document.getElementById('alert');
                    event.stopPropagation();
                    let text = `${iterator?.adhkar}\n\n__________\n\n`;
                    text += `${iterator?.description}\n`
                    text += `・ المصدر: ${iterator?.source}\n`
                    text += `・ التكرار: ${iterator?.repetition}\n\n\n`
                    text += `#تطبيق_التقوى`

                    cordova.plugins.clipboard.copy(text);

                    alert.style.display = "block"
                    setTimeout(() => {
                        alert.style.display = 'none'
                    }, 1000);
                });
            }
            await new Promise(r => setTimeout(r, 1000));
            loading.style.display = "none";
        }

    }


    /*
        // حدث عدد تكرار الذكر
    
        if (document.getElementsByClassName("adhkar")[0]) {
            let storage = window.localStorage;
            let adhkar = Array.from(document.getElementsByClassName("adhkar"));
            let numbers = [];
    
            for (let item of adhkar) {
    
                let adhkarEl = document.getElementById(item.id);
                let numEl = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition > .repetition_number`).textContent
                numbers.push(numEl);
                adhkarEl.addEventListener("click", async (e) => {
    
                    let adhkar_database = storage.getItem('adhkar_database');
                    let numberEl = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition > .repetition_number`)
    
                    if (Number(numberEl.textContent) > 0) {
    
                        navigator?.vibrate(0);
                        navigator?.vibrate(50);
                        numberEl.innerText = Number(numberEl.textContent) - 1;
                        storage.setItem("adhkar_database", Number(adhkar_database ? adhkar_database : 0) + 1);
    
                        if (Number(numberEl.textContent) === 0) {
    
                            let div = document.querySelector(`[id='${item.id}']`);
                            let copy_and_paste = document.querySelector(`[id='${item.id}'] > .copy_and_paste`);
                            let repetition = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition`);
                            let repetition_number = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition > .repetition_number`);
                            let text_bottom = document.querySelector(`[id='${item.id}'] > .text_bottom`);
                            div.style.backgroundColor = "var(--background_div_hover)";
                            div.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                            copy_and_paste.style.backgroundColor = "var(--background_div_hover_2)";
                            repetition.style.color = "var(--green)";
                            repetition_number.style.color = "var(--white-div)";
                            text_bottom.style.color = "var(--green)";
    
                        }
                    }
    
                    else {
    
                        if (Number(numberEl.textContent) > 0) {
                            numberEl.innerText = numbers[Number(item.id - 1)];
                            storage.setItem("adhkar_database", Number(adhkar_database ? adhkar_database : 0) + 1);
                        }
                    }
                });
            }
        }
    
        
        */

}
