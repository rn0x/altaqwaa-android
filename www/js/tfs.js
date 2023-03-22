import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/pages/tfs.html') {

        let tfsJson = await loadJson("/data/tafseerMouaser.json");
        let quranJson = await loadJson("/data/quran.json");
        let back = document.getElementById('back');
        let more_header_title = document.getElementById('more_header_title');
        let tfs = document.getElementById('tfs');
        let tfs_ayat = document.getElementById('tfs_ayat');
        let tfs_part1 = document.getElementById('tfs_part1');
        let tfs_part2 = document.getElementById('tfs_part2');

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });

        for (let index = 1; index <= 114; index++) {

            let element = tfsJson.filter(e => Number(e?.sura_no) === index);
            let li = document.createElement("li");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");

            tfs.appendChild(li);
            li.appendChild(p);
            p.innerText = element?.[0]?.sura_no;
            li.appendChild(h3);
            h3.innerText = element?.[0]?.sura_name_ar;

            li.addEventListener("click", e => {

                window.scrollTo(0, 0);
                more_header_title.innerText = `تفسير سورة ${element?.[0]?.sura_name_ar}`;
                tfs_part1.style.display = "none";
                tfs_part2.style.display = "block";

                for (let item of element) {

                    let ayah_id = Number(item?.aya_no);
                    let quran = quranJson?.[index - 1]?.array_verses?.[0]?.[ayah_id - 1];
                    let li = document.createElement("li");
                    let tfs_id = document.createElement("p");
                    let ayaat = document.createElement("h3");
                    let tafseer = document.createElement("p");

                    tfs_ayat.appendChild(li);
                    li.appendChild(tfs_id);
                    tfs_id.className = "tfs_id";
                    tfs_id.innerText = item?.aya_no;
                    li.appendChild(ayaat);
                    ayaat.className = "ayaat";
                    ayaat.innerText = quran?.ar;
                    li.appendChild(tafseer);
                    tafseer.className = "tafseer";
                    tafseer.innerText = item?.aya_tafseer;
                }

                back.addEventListener("click", e => {
                    window.location.href = "/pages/tfs.html";
                });

            });

        }


    }
}