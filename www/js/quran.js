/**
 * @fileoverview
 * كود JavaScript لعرض القرآن الكريم بتنسيق معين.
 * يتم استخدامه في صفحة 'quran.html'.
 * @author rn0x
 */

import Downloader from './modules/Downloader.js';
import loadJson from './modules/loadJson.js';
import errorHandling from './modules/error_handling.js';


let isAudioPlaying = false;
let currentAudio = null;
let currentPlayButton = null;

/**
 * الدالة الرئيسية التي تقوم بتحميل وعرض القرآن الكريم على الصفحة.
 * @async
 */
export default async () => {
    try {
        // التحقق من أننا في صفحة 'quran.html'
        if (window.location.pathname === '/quran.html') {
            // عرض رمز التحميل أثناء جلب البيانات
            let loading = document.getElementById('loading');
            loading.style.display = "block";

            // جلب بيانات القرآن من ملف JSON
            let mp3quran = await loadJson('/data/mp3quran.json');

            // العناصر الرئيسية في الصفحة
            let quranReader = document.getElementById("quran_reader");
            let searchReader = document.getElementById("search_reader");

            // عرض القراء
            for (let item of mp3quran) {
                let li = document.createElement("li");
                let quranReaderTitle = document.createElement("p");
                let quranReaderDiv = document.createElement("div");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");

                quranReader.appendChild(li);
                li.className = 'quran_reader_li';
                li.id = `reader_id_${item?.id}`;
                li.appendChild(quranReaderTitle);
                quranReaderTitle.innerText = "القارئ";
                quranReaderTitle.className = "quran_reader_title";
                li.appendChild(quranReaderDiv);
                quranReaderDiv.className = "quran_reader_div";
                quranReaderDiv.appendChild(h3);
                h3.innerText = item?.name;
                quranReaderDiv.appendChild(p);
                p.innerText = item?.rewaya;
            }

            // إضافة حدث البحث على القراء
            searchReader.addEventListener("keyup", (e) => {
                searchAndDisplayLi("quran_reader", searchReader?.value);
            });

            // إضافة حدث النقر على كل قارئ
            let quranReaderLi = document.getElementsByClassName("quran_reader_li");

            for (let item of Array.from(quranReaderLi)) {
                let li = document.getElementById(item.id);
                li.addEventListener("click", e => {
                    // تنفيذ عمليات النقر على القارئ
                    const Eid = Number(item?.id?.split("reader_id_")[1]);
                    const itemMp3 = mp3quran?.[Eid - 1];
                    handleReaderClick(itemMp3, mp3quran);
                });
            }

            // إخفاء رمز التحميل بعد اكتمال التحميل
            loading.style.display = "none";
        }
    } catch (error) {
        // معالجة الأخطاء إذا حدثت
        errorHandling(error);
    }
}

/**
 * الدالة للبحث وعرض عناصر LI بناءً على النص المدخل.
 * @param {string} ulId - معرف عنصر القائمة الذي سنقوم بالبحث فيه.
 * @param {string} searchText - النص الذي نقوم بالبحث عنه.
 */
function searchAndDisplayLi(ulId, searchText) {
    const ulElement = document.getElementById(ulId);
    const liElements = ulElement.getElementsByTagName("li");

    for (let i = 0; i < liElements.length; i++) {
        const liText = liElements[i].textContent;
        const shouldDisplay = liText.includes(searchText);
        liElements[i].style.display = shouldDisplay ? "block" : "none";
    }
}

/**
 * الدالة لمعالجة النقر على عنصر LI الخاص بالقراء.
 * @param {HTMLElement} item - عنصر القارئ الذي تم النقر عليه.
 * @param {Array} mp3quran - مصفوفة تحتوي على بيانات القرآن الكريم.
 */
function handleReaderClick(item, mp3quran) {
    try {
        // إخفاء حقل البحث
        let searchReader = document.getElementById("search_reader");
        searchReader.style.display = "none";

        // العودة إلى صفحة القرآن
        let quranReader = document.getElementById("quran_reader");
        let quranMp3H3 = document.getElementById("quran_mp3_h3");
        let quranReaderSurahHeader = document.getElementById("quran_reader_surah_header");
        let quranReaderSurahHeaderBack = document.getElementById("quran_reader_surah_header_back");
        let quranReaderSurahHeaderTitle = document.getElementById("quran_reader_surah_header_title");

        quranMp3H3.style.display = "none";
        quranReader.style.display = "none";
        quranReaderSurahHeader.style.display = "flex";
        quranReaderSurahHeaderTitle.innerText = item?.name;

        // إضافة حدث العودة إلى صفحة القرآن
        quranReaderSurahHeaderBack.addEventListener("click", e => {
            window.location.href = "/quran.html";
        });

        // عرض صفحة السور
        let quranReaderSurah = document.getElementById("quran_reader_surah");
        quranReaderSurah.style.display = "block";


        for (let iterator of item?.audio) {
            let li = document.createElement("li");
            let h3 = document.createElement("h3");
            let quranReaderSurahImg = document.createElement("div");
            let playButton = document.createElement("img");
            let download = document.createElement("img");

            quranReaderSurah.appendChild(li);
            li.appendChild(h3);
            h3.innerHTML = `<span>${iterator?.id}</span> ${iterator?.name}`;
            li.appendChild(quranReaderSurahImg);
            quranReaderSurahImg.appendChild(playButton);
            playButton.id = `quran_reader_surah_img_play_${iterator?.id}`;
            playButton.src = "/img/play.png";
            playButton.className = "quran_reader_surah_img_play";
            quranReaderSurahImg.appendChild(download);
            download.id = `quran_reader_surah_img_download_${iterator?.id}`;
            download.src = "/img/download.png";
            download.className = "quran_reader_surah_img_download";
            let audio = new Audio(iterator?.link);
            let audioId = `quran_reader_audio_id_${iterator?.id}`;
            audio.preload = 'none';
            audio.autoplay = false; 
            audio.id = audioId;
            const isMediaPlayStorage = (value) => { localStorage.setItem('isMediaPlay', `${value}`) };
            const isPausedStorage = (value) => { localStorage.setItem('isPaused', `${value}`) };
            const AudioNameStoarge = (value) => { localStorage.setItem('AudioName', `${value}`) };
            const linkAudioStoarge = (value) => { localStorage.setItem('linkAudio', `${value}`) };

            // إضافة حدث انتهاء التشغيل
            audio.addEventListener("ended", () => {
                console.log("تم الإنتهاء من الصوت وإيقافه");
                isAudioPlaying = false;
                playButton.src = "/img/play.png";
                isMediaPlayStorage(false);
                isPausedStorage(true);
            });

            // حدث زر التشغيل والإيقاف الخاص بالصوت 
            playButton.addEventListener("click", async () => {

                linkAudioStoarge(iterator?.link);
                if (!isAudioPlaying) {
                    playButton.src = "/img/loading.svg";
                    isMediaPlayStorage(false);
                    isPausedStorage(true);
                    await new Promise(r => setTimeout(r, 2000));
                    playAudio(audio, playButton);
                    AudioNameStoarge(`${item?.name} - ${iterator?.name}`);
                    currentAudio = audio;
                    currentPlayButton = playButton;
                    isMediaPlayStorage(true);
                    isPausedStorage(false);
                } else {

                    if (currentAudio && currentAudio !== audio) {
                        playButton.src = "/img/loading.svg";
                        isMediaPlayStorage(false);
                        isPausedStorage(true);
                        await new Promise(r => setTimeout(r, 2000));
                        stopAudio(currentAudio, currentPlayButton);
                        playAudio(audio, playButton);
                        AudioNameStoarge(`${item?.name} - ${iterator?.name}`);
                        currentAudio = audio;
                        currentPlayButton = playButton;
                        isMediaPlayStorage(true);
                        isPausedStorage(false);
                    }
                    else {
                        stopAudio(audio, playButton);
                        isMediaPlayStorage(false);
                        isPausedStorage(true);
                    }
                }

                setInterval(() => {
                    localStorage.setItem('audioCurrentTime', audio.currentTime);
                }, 1000);
            });

            // إضافة حدث النقر لتحميل الملف الصوتي
            download.addEventListener("click", async e => {
                Downloader(iterator?.link, `${iterator?.name} - ${item?.name}.mp3`);
            });
        }
    } catch (error) {
        // معالجة الأخطاء إذا حدثت
        errorHandling(error);
    }
}


/**
 * الدالة لتشغيل الصوت.
 * @param {HTMLAudioElement} audio - عنصر الصوت الذي سيتم تشغيله.
 * @param {HTMLElement} playButton - زر التشغيل الذي يتم النقر عليه.
 */
function playAudio(audio, playButton) {
    audio.play().then(() => {
        console.log("تم تشغيل الصوت");
        isAudioPlaying = true;
        playButton.src = "/img/stop.png";
    }).catch((error) => {
        console.error("Error playing audio:", error);
        isAudioPlaying = false;
        playButton.src = "/img/play.png";
    });

    // تحديث الصوت الحالي
    currentAudio = audio;
}


/**
 * الدالة لإيقاف الصوت.
 * @param {HTMLAudioElement} audio - عنصر الصوت الذي سيتم إيقافه.
 * @param {HTMLElement} playButton - زر الإيقاف الذي يتم النقر عليه.
 */
function stopAudio(audio, playButton) {
    console.log("تم إيقاف الصوت");
    audio.pause();
    audio.currentTime = 0;
    playButton.src = "/img/play.png";
    isAudioPlaying = false;
}