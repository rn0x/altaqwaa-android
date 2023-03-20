import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/index.html') {


        let adhkarJson = await loadJson('/data/adhkar.json');
        let adhkar_random_text = document.getElementById('adhkar_random_text');
        let adhkar_random_description = document.getElementById('adhkar_random_description');
        let adhkar_random_reference = document.getElementById('adhkar_random_reference');
        let adhkar_random_copy = document.getElementById('adhkar_random_copy');
        let adhkar_random_bt = document.getElementById('adhkar_random_bt');
        let alert = document.getElementById('alert');
        let adhkar_random = adhkarJson[Math.floor(Math.random() * adhkarJson.length)];

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

        document.addEventListener("backbutton", function (e) {

            let storage = window.localStorage;
            storage.setItem('audioPlayingId', null);
            storage.setItem('icon_audio', null);
            storage.setItem('AdhanPlaying', "false");

            navigator.notification.confirm(
                'هل بالفعل تريد الخروج من التطبيق ؟',  // message
                (e) => {

                    if (e === 2 || e === 0) {

                        if (navigator.app) {
                            navigator.app.exitApp();
                        }

                        else if (navigator.device) {
                            navigator.device.exitApp();
                        }

                        else {
                            window.close();
                        }

                    }

                    else {
                        window.open("https://github.com/rn0x", "_blank");
                    }
                },         // callback
                'خروج',            // title
                ['تقييم التطبيق', 'خروج']                 // buttonName
            );



        }, false);
    }

    // حدث عدد تكرار الذكر

    if (document.getElementsByClassName("adhkar")[0]) {
        let adhkar = Array.from(document.getElementsByClassName("adhkar"));
        let numbers = [];

        for (let item of adhkar) {
            let adhkarEl = document.getElementById(item.id);
            let numEl = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition > .repetition_number`).textContent
            numbers.push(numEl);
            adhkarEl.addEventListener("click", (e) => {
                let numberEl = document.querySelector(`[id='${item.id}'] > .copy_and_paste > .repetition > .repetition_number`)
                if (Number(numberEl.textContent) > 0) {
                    numberEl.innerText = Number(numberEl.textContent) - 1
                }
                else {
                    numberEl.innerText = numbers[Number(item.id - 1)]
                }
            });
        }
    }

}