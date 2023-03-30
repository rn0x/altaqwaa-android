import error_handling from './modules/error_handling.js';
import loadJson from './modules/loadJson.js';

export default async () => {

    if (window.location.pathname === '/pages/allah.html') {

        try {

            let allahJson = await loadJson("/data/Names_Of_Allah.json");
            let back = document.getElementById('back');
            let allah_names = document.getElementById('allah_names');

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            for (let item of allahJson) {

                let li = document.createElement("li");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");

                allah_names.appendChild(li);
                li.appendChild(h3);
                h3.innerText = item?.name;
                li.appendChild(p);
                p.innerText = item?.text;
            }

        } catch (error) {

            error_handling(error);
        }

    }
}
