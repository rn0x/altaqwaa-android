import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/pages/radio.html') {

        let radioJson = await loadJson("/data/radio.json");
        let back = document.getElementById('back');
        let radio_quran = document.getElementById('radio_quran');
        let audioPlaying = false;

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });

        for (let item of radioJson) {

            let li = document.createElement("li");
            let radio_quran_number = document.createElement("p");
            let radio_quran_title = document.createElement("h3");
            let radio_quran_play = document.createElement("img");
            let audioStart = true;
            let audio = new Audio(item?.link);
            audio.id = `radio_quran_audio_id_${item?.id}`;
            audio.preload = 'none';
            audio.autoplay = false;

            radio_quran.appendChild(li);
            li.appendChild(radio_quran_number);
            radio_quran_number.className = "radio_quran_number";
            radio_quran_number.innerText = item?.id;
            li.appendChild(radio_quran_title);
            radio_quran_title.className = "radio_quran_title";
            radio_quran_title.innerText = item?.name;
            li.appendChild(radio_quran_play);
            radio_quran_play.className = "radio_quran_play";
            radio_quran_play.id = `radio_quran_play_id_${item?.id}`;
            radio_quran_play.src = "/img/play.png";

            let radio_play = document.getElementById(`radio_quran_play_id_${item?.id}`);

            radio_play.addEventListener("click", async e => {

                e.preventDefault();

                if (audioStart && audioPlaying === false) {

                    audioPlaying = true;
                    audioStart = false;

                    if (audio.buffered.length === 0) {

                        radio_play.src = "/img/loading.svg";
                    }

                    await audio.play();
                    radio_play.src = "/img/stop.png";
                }

                else {

                    audioPlaying && audioStart === false ? audioPlaying = false : false;
                    audioStart = true;
                    audio.pause();
                    radio_play.src = "/img/play.png";
                }

            });

        }

    }
}