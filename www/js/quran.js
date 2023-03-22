import Downloader from './modules/Downloader.js';
import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/quran.html') {        

        let mp3quran = await loadJson('/data/mp3quran.json');
        let quran_reader = document.getElementById("quran_reader");

        for (let item of mp3quran) {

            let li = document.createElement("li");
            let quran_reader_title = document.createElement("p");
            let quran_reader_div = document.createElement("div");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");

            quran_reader.appendChild(li);
            li.className = 'quran_reader_li';
            li.id = `reader_id_${item?.id}`;
            li.appendChild(quran_reader_title);
            quran_reader_title.innerText = "القارئ";
            quran_reader_title.className = "quran_reader_title";
            li.appendChild(quran_reader_div);
            quran_reader_div.className = "quran_reader_div";
            quran_reader_div.appendChild(h3);
            h3.innerText = item?.name;
            quran_reader_div.appendChild(p);
            p.innerText = item?.rewaya;

        }

        let quran_reader_li = document.getElementsByClassName("quran_reader_li");

        for (let item of Array.from(quran_reader_li)) {

            let li = document.getElementById(item.id);
            li.addEventListener("click", e => {

                window.scrollTo(0, 0);
                let Eid = Number(item?.id?.split("reader_id_")[1]);
                mp3quran = mp3quran?.[Eid - 1];
                let quran_mp3_h3 = document.getElementById("quran_mp3_h3");
                let quran_reader = document.getElementById("quran_reader");
                let quran_reader_surah_header = document.getElementById("quran_reader_surah_header");
                let quran_reader_surah_header_back = document.getElementById("quran_reader_surah_header_back");
                let quran_reader_surah_header_title = document.getElementById("quran_reader_surah_header_title");

                quran_mp3_h3.style.display = "none";
                quran_reader.style.display = "none";
                quran_reader_surah_header.style.display = "flex";
                quran_reader_surah_header_title.innerText = mp3quran?.name;

                // return Quran Page

                quran_reader_surah_header_back.addEventListener("click", e => {
                    window.location.href = "/quran.html";
                });

                // SURAH 

                let quran_reader_surah = document.getElementById("quran_reader_surah");
                quran_reader_surah.style.display = "block";

                let audioPlaying = false;

                for (let iterator of mp3quran?.audio) {

                    let li = document.createElement("li");
                    let h3 = document.createElement("h3");
                    let quran_reader_surah_img = document.createElement("div");
                    let play = document.createElement("img");
                    let download = document.createElement("img");

                    quran_reader_surah.appendChild(li);
                    li.appendChild(h3);
                    h3.innerHTML = `<span>${iterator?.id}</span> ${iterator?.name}`;
                    li.appendChild(quran_reader_surah_img);
                    quran_reader_surah_img.appendChild(play);
                    play.id = `quran_reader_surah_img_play_${iterator?.id}`;
                    play.src = "/img/play.png";
                    play.className = "quran_reader_surah_img_play";
                    quran_reader_surah_img.appendChild(download);
                    download.id = `quran_reader_surah_img_download_${iterator?.id}`;
                    download.src = "/img/download.png";
                    download.className = "quran_reader_surah_img_download";

                    // icon play

                    let quran_reader_surah_img_play = document.getElementById(`quran_reader_surah_img_play_${iterator?.id}`);
                    let audioStart = true;
                    let audio = new Audio(iterator?.link);
                    quran_reader_surah_img.appendChild(audio);
                    audio.id = `quran_reader_audio_id_${iterator?.id}`;
                    audio.preload = 'none';
                    audio.autoplay = false;

                    quran_reader_surah_img_play.addEventListener("click", async e => {

                        e.preventDefault();

                        let storage = window.localStorage;
                        let audioPlayingId = storage.getItem('audioPlayingId');
                        let icon_audio = storage.getItem('icon_audio');

                        if (icon_audio && icon_audio !== `quran_reader_surah_img_play_${iterator?.id}`) {

                            let oldPlaying = document.getElementById(audioPlayingId);
                            let oldIconPlay = document.getElementById(icon_audio);

                            oldPlaying.pause();
                            oldIconPlay.src = "/img/play.png";
                            audioPlaying = false;
                            audioStart = true;

                        }


                        if (audioStart && audioPlaying === false) {

                            audioPlaying = true;
                            audioStart = false;

                            storage.setItem('audioPlayingId', `quran_reader_audio_id_${iterator?.id}`);
                            storage.setItem('icon_audio', `quran_reader_surah_img_play_${iterator?.id}`);

                            if (audio.buffered.length === 0) {

                                quran_reader_surah_img_play.src = "/img/loading.svg";
                            }

                            await audio.play();
                            quran_reader_surah_img_play.src = "/img/stop.png";
                        }

                        else {

                            audioPlaying = false;
                            audioStart = true;
                            audio.pause();
                            quran_reader_surah_img_play.src = "/img/play.png";
                        }


                    });

                    // icon download

                    let quran_reader_surah_img_download = document.getElementById(`quran_reader_surah_img_download_${iterator?.id}`);

                    quran_reader_surah_img_download.addEventListener("click", async e => {

                        Downloader(iterator?.link, `${iterator?.name} - ${mp3quran?.name}.mp3`);

                        // let link = document.createElement('a');
                        // link.href = iterator?.link;
                        // link.download = `${iterator?.name}-${item?.name}.mp3`;
                        // link.hidden = true
                        // link.click();

                    });
                }

            });

        }

    }
}