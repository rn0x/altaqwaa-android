import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/pages/hisnmuslim.html') {

        let hisnmuslimJson = await loadJson("/data/hisnmuslim.json");
        let back = document.getElementById('back');
        let more_header_title = document.getElementById('more_header_title');
        let hisnmuslim_index = document.getElementById('hisnmuslim_index');
        let Search_hisnmuslim = document.getElementById('Search_hisnmuslim');
        let hisnmuslim_tbody = document.getElementById('hisnmuslim_tbody');
        let hisnmuslim_part1 = document.getElementById('hisnmuslim_part1');
        let hisnmuslim_part2 = document.getElementById('hisnmuslim_part2');

        back.addEventListener("click", e => {
            window.location.href = "/more.html";
        });




        for (let item of hisnmuslimJson) {

            let tr = document.createElement("tr");
            let td_number = document.createElement("td");
            let td_category = document.createElement("td");
            let category = document.createElement("p");
            hisnmuslim_tbody.appendChild(tr);
            tr.appendChild(td_number);
            td_number.innerText = item?.id;
            tr.appendChild(td_category);
            td_category.appendChild(category);
            category.innerText = item?.category;
            category.className = "hisnmuslim_category";
            category.id = `hisnmuslim_category_id_${item?.id}`;

            let hisnmuslim_category = document.getElementById(`hisnmuslim_category_id_${item?.id}`);

            hisnmuslim_category.addEventListener("click", e => {

                window.scrollTo(0, 0);
                let hisnmuslim_ul_category = document.getElementById("hisnmuslim_ul_category");
                hisnmuslim_part1.style.display = "none";
                hisnmuslim_part2.style.display = "block";
                more_header_title.innerText = item?.category;

                back.addEventListener("click", e => {
                    window.location.href = "/pages/hisnmuslim.html";
                });

                for (let iterator of item?.array) {

                    let li = document.createElement("li");
                    let hisnmuslim_ul_audio = document.createElement("audio");
                    let hisnmuslim_ul_text = document.createElement("h3");
                    let hisnmuslim_ul_tkrar = document.createElement("p");


                    hisnmuslim_ul_category.appendChild(li);
                    li.appendChild(hisnmuslim_ul_audio);
                    hisnmuslim_ul_audio.className = "hisnmuslim_ul_audio";
                    hisnmuslim_ul_audio.src = iterator?.audio;
                    hisnmuslim_ul_audio.controls = true;
                    hisnmuslim_ul_audio.disablepictureinpicture = true;
                    hisnmuslim_ul_audio.controlslist = "nodownload noplaybackrate";
                    li.appendChild(hisnmuslim_ul_text);
                    hisnmuslim_ul_text.className = "hisnmuslim_ul_text";
                    hisnmuslim_ul_text.innerHTML = filterSpan(iterator?.text);
                    li.appendChild(hisnmuslim_ul_tkrar);
                    hisnmuslim_ul_tkrar.className = "hisnmuslim_ul_tkrar";
                    hisnmuslim_ul_tkrar.innerHTML = `التكرار : <span class="hisnmuslim_ul_count">${iterator?.count}</span>`

                }ي

            });

        }


        // Search

        Search_hisnmuslim.addEventListener("keyup", e => {

            let filter = Search_hisnmuslim.value.toUpperCase();
            let tr = hisnmuslim_index.getElementsByTagName("tr");

            for (let i = 0; i < tr.length; i++) {
                let td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        });

    }
}


function filterSpan(text) {
    let span = text?.split('ﷺ')?.join('<span style="color: #b62b2b;">ﷺ</span>')
        ?.split('عَزَّ وَجَلَّ')?.join('<span style="color: #b62b2b;">عَزَّ وَجَلَّ</span>')
        ?.split('ﷻ')?.join('<span style="color: #b62b2b;">ﷻ</span>')
        ?.split('بسم الله الرحمن الرحيم')?.join('<span style="color: #b62b2b;">بسم الله الرحمن الرحيم</span>')
        ?.split('الله')?.join('<span style="color: #b62b2b;">الله</span>')
        ?.split('اللَّٰه')?.join('<span style="color: #b62b2b;">اللَّٰه</span>')
        ?.split('سُبْحَانَهُ وَتَعَالَى')?.join('<span style="color: #b62b2b;">سُبْحَانَهُ وَتَعَالَى</span>')
        ?.split('عليه السلام')?.join('<span style="color: #b62b2b;">عليه السلامﷺ</span>')
        ?.split('رضي الله عنه')?.join('<span style="color: #b62b2b;">رضي الله عنه</span>')
        ?.split('(')?.join('<span style="color: #ffffff;">(')?.split(')')?.join(')</span>')
        ?.split('[')?.join('<span style="color: #797979;">[')?.split(']')?.join(']</span>')
        ?.split('﴿')?.join(' <span style="color: #7f8862;">﴿')?.split('﴾')?.join('﴾</span>')
        ?.split('«')?.join('<span style="color: #6bc077;">«')?.split('»')?.join('»</span>');

    return span
}