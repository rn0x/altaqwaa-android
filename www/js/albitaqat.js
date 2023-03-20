import loadJson from './modules/loadJson.js';
import filterSpan from './modules/filterSpan.js';

export default async () => {

    if (window.location.pathname === '/pages/albitaqat.html') {

        let albitaqatJson = await loadJson("/data/albitaqat.json");
        let quranJson = await loadJson("/data/quran.json");
        let back = document.getElementById('back');
        let more_header_title = document.getElementById('more_header_title');
        let albitaqat_part1 = document.getElementById("albitaqat_part1");
        let albitaqat_part2 = document.getElementById("albitaqat_part2");
        let albitaqat_index = document.getElementById("albitaqat_index");
        let albitaqat_data = document.getElementById("albitaqat_data");
        let albitaqat_audio = document.getElementById("albitaqat_audio");

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });

        for (let item of albitaqatJson) {

            let li = document.createElement("li");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");

            albitaqat_index.appendChild(li);
            li.id = `albitaqat_index_li_id_${item?.id}`;
            li.className = "albitaqat_index_li";
            li.appendChild(h3);
            h3.innerText = item?.surah;
            li.appendChild(p);
            p.innerText = quranJson?.[item?.id - 1]?.descent;
        }

        let albitaqat_index_li = document.getElementsByClassName("albitaqat_index_li");

        for (let item of Array.from(albitaqat_index_li)) {

            let surah = document.getElementById(item.id);

            surah.addEventListener("click", e => {

                window.scrollTo(0, 0);
                let id = item.id.split("albitaqat_index_li_id_")[1] - 1
                albitaqatJson = albitaqatJson?.[id]
                albitaqat_part1.style.display = "none";
                albitaqat_part2.style.display = "block";
                more_header_title.innerText = `بطاقة سورة ${albitaqatJson?.surah}`;
                albitaqat_audio.src = albitaqatJson?.audio;

                let ayaatiha = document.createElement("li");
                let ayaatiha_title = document.createElement("h3");
                let ayaatiha_text = document.createElement("p");

                albitaqat_data.appendChild(ayaatiha);
                ayaatiha.appendChild(ayaatiha_title);
                ayaatiha_title.innerText = "أياتها";
                ayaatiha_title.className = "albitaqat_data_title";
                ayaatiha.appendChild(ayaatiha_text);
                ayaatiha_text.className = "albitaqat_data_text";
                ayaatiha_text.innerHTML = filterSpan(albitaqatJson?.ayaatiha)

                let maeni_asamuha = document.createElement("li");
                let maeni_asamuha_title = document.createElement("h3");
                let maeni_asamuha_text = document.createElement("p");

                albitaqat_data.appendChild(maeni_asamuha);
                maeni_asamuha.appendChild(maeni_asamuha_title);
                maeni_asamuha_title.innerText = "معني أسمها";
                maeni_asamuha_title.className = "albitaqat_data_title";
                maeni_asamuha.appendChild(maeni_asamuha_text);
                maeni_asamuha_text.className = "albitaqat_data_text";
                maeni_asamuha_text.innerHTML = filterSpan(albitaqatJson?.maeni_asamuha);

                let sabab_tasmiatiha = document.createElement("li");
                let sabab_tasmiatiha_title = document.createElement("h3");
                let sabab_tasmiatiha_text = document.createElement("p");

                albitaqat_data.appendChild(sabab_tasmiatiha);
                sabab_tasmiatiha.appendChild(sabab_tasmiatiha_title);
                sabab_tasmiatiha_title.innerText = "سبب تسميتها";
                sabab_tasmiatiha_title.className = "albitaqat_data_title";
                sabab_tasmiatiha.appendChild(sabab_tasmiatiha_text);
                sabab_tasmiatiha_text.className = "albitaqat_data_text";
                sabab_tasmiatiha_text.innerHTML = filterSpan(albitaqatJson?.sabab_tasmiatiha);

                let asmawuha = document.createElement("li");
                let asmawuha_title = document.createElement("h3");
                let asmawuha_text = document.createElement("p");

                albitaqat_data.appendChild(asmawuha);
                asmawuha.appendChild(asmawuha_title);
                asmawuha_title.innerText = "أسماؤها";
                asmawuha_title.className = "albitaqat_data_title";
                asmawuha.appendChild(asmawuha_text);
                asmawuha_text.className = "albitaqat_data_text";
                asmawuha_text.innerHTML = filterSpan(albitaqatJson?.asmawuha);

                let maqsiduha_aleamu = document.createElement("li");
                let maqsiduha_aleamu_title = document.createElement("h3");
                let maqsiduha_aleamu_text = document.createElement("p");

                albitaqat_data.appendChild(maqsiduha_aleamu);
                maqsiduha_aleamu.appendChild(maqsiduha_aleamu_title);
                maqsiduha_aleamu_title.innerText = "مقصدها العام";
                maqsiduha_aleamu_title.className = "albitaqat_data_title";
                maqsiduha_aleamu.appendChild(maqsiduha_aleamu_text);
                maqsiduha_aleamu_text.className = "albitaqat_data_text";
                maqsiduha_aleamu_text.innerHTML = filterSpan(albitaqatJson?.maqsiduha_aleamu);

                let sabab_nuzuliha = document.createElement("li");
                let sabab_nuzuliha_title = document.createElement("h3");
                let sabab_nuzuliha_text = document.createElement("p");

                albitaqat_data.appendChild(sabab_nuzuliha);
                sabab_nuzuliha.appendChild(sabab_nuzuliha_title);
                sabab_nuzuliha_title.innerText = "سبب نزولها";
                sabab_nuzuliha_title.className = "albitaqat_data_title";
                sabab_nuzuliha.appendChild(sabab_nuzuliha_text);
                sabab_nuzuliha_text.className = "albitaqat_data_text";
                sabab_nuzuliha_text.innerHTML = filterSpan(albitaqatJson?.sabab_nuzuliha);

                let fadluha = document.createElement("li");
                let fadluha_title = document.createElement("h3");
                let fadluha_text = document.createElement("p");

                albitaqat_data.appendChild(fadluha);
                fadluha.appendChild(fadluha_title);
                fadluha_title.innerText = "فضلها";
                fadluha_title.className = "albitaqat_data_title";
                fadluha.appendChild(fadluha_text);
                fadluha_text.className = "albitaqat_data_text";
                fadluha_text.innerHTML = filterSpan(albitaqatJson?.fadluha?.join("<br><br>"));

                let munasabatiha = document.createElement("li");
                let munasabatiha_title = document.createElement("h3");
                let munasabatiha_text = document.createElement("p");

                albitaqat_data.appendChild(munasabatiha);
                munasabatiha.appendChild(munasabatiha_title);
                munasabatiha_title.innerText = "مناسباتها";
                munasabatiha_title.className = "albitaqat_data_title";
                munasabatiha.appendChild(munasabatiha_text);
                munasabatiha_text.className = "albitaqat_data_text";
                munasabatiha_text.innerHTML = filterSpan(albitaqatJson?.munasabatiha?.join("<br><br>"));

                back.addEventListener("click", e => {
                    window.location.href = "/pages/albitaqat.html";
                });

            });

        }

    }
}