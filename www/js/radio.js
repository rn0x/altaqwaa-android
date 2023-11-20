import loadJson from './modules/loadJson.js';
import error_handling from './modules/error_handling.js';

export default async () => {
    if (window.location.pathname === '/pages/radio.html') {
        try {
            let radioJson = await loadJson("/data/radio.json");
            let back = document.getElementById('back');
            let radio_quran = document.getElementById('radio_quran');
            let currentAudio = null;
            let currentIcon = null;

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            for (let item of radioJson) {

                let li = document.createElement("li");
                let radio_quran_number = document.createElement("p");
                let radio_quran_title = document.createElement("h3");
                let radio_quran_play = document.createElement("img");
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

                radio_quran_play.addEventListener("click", async () => {
                    try {

                       if (currentAudio && currentAudio !== audio) {
                            currentAudio.pause();
                            setPlayIcon(currentIcon);
                        }

                        if (audio.paused) {
                            if (audio.buffered.length === 0) {

                                radio_quran_play.src = "/img/loading.svg";
                            }
                            await audio.play();
                            setStopIcon(radio_quran_play);
                        } else {
                            audio.pause();
                            setPlayIcon(radio_quran_play);
                        }

                        currentAudio = audio;
                        currentIcon = radio_quran_play;
                    } catch (error) {
                        error_handling(error);
                    }
                });
            }

            function setPlayIcon(audioElement) {
                const playButton = document.getElementById(audioElement?.id);
                if (playButton) {
                    playButton.src = "/img/play.png";
                } 
            }
            
            function setStopIcon(audioElement) {
                const stopButton = document.getElementById(audioElement?.id);
                if (stopButton) {
                    stopButton.src = "/img/stop.png";
                } 
            }
            

        } catch (error) {
            error_handling(error);
        }
    }
};