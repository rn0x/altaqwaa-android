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

            const searchInput = document.getElementById('radioSearch');

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                filterRadioItems(radioJson, searchTerm);
            });

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            filterRadioItems(radioJson, '');

            function filterRadioItems(data, term) {
                const filteredData = data.filter(item => item.name.toLowerCase().includes(term));
                displayRadioItems(filteredData);
            }

            function displayRadioItems(data) {
                // Clear existing items
                radio_quran.innerHTML = '';

                for (let item of data) {
                    let li = document.createElement("li");
                    let radio_quran_number = document.createElement("p");
                    let radio_quran_title = document.createElement("h3");
                    let radioLogo = document.createElement("img");
                    radioLogo.src = item?.image || "default_image_url"; // Use the image attribute or provide a default image URL
                    radioLogo.id = "radio_logo";
                    radioLogo.width = 50;
                    radioLogo.height = 50;
                    let radio_quran_play = document.createElement("img");
                    let audio = new Audio(item?.link);
                    audio.id = `radio_quran_audio_id_${item?.id}`;
                    audio.preload = 'none';
                    audio.autoplay = false;
                    audio.crossOrigin = 'anonymous'; // Add this line to handle CORS

                    radio_quran.appendChild(li);
                    li.appendChild(radioLogo);
                    li.appendChild(radio_quran_number);
                    radio_quran_number.className = "radio_quran_number";
                    // radio_quran_number.innerText = item?.id;
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

                                // Start background audio
                                if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.backgroundaudio) {
                                    cordova.plugins.backgroundaudio.unmute(); // Unmute to allow background playback
                                    cordova.plugins.backgroundaudio.play();
                                }
                            } else {
                                audio.pause();
                                setPlayIcon(radio_quran_play);

                                // Stop background audio
                                if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.backgroundaudio) {
                                    cordova.plugins.backgroundaudio.stop();
                                }
                            }

                            currentAudio = audio;
                            currentIcon = radio_quran_play;
                        } catch (error) {
                            error_handling(error);
                        }
                    });
                }
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
