import error_handling from './modules/error_handling.js';
import loadHtml from './modules/loadHtml.js';

export default async () => {

    try {

        let footer = document.getElementById('footer');
        let fileHtml = "/footer.html";
        let load = await loadHtml(fileHtml);
        footer.innerHTML = load;


        // menu 

        let adhkar = document.getElementById('adhkar');
        let prayer = document.getElementById('prayer');
        let quran = document.getElementById('quran');
        let more = document.getElementById('more');

        adhkar.onclick = () => {
            window.location.href = '/index.html'
        }

        prayer.onclick = () => {
            window.location.href = '/prayer.html'
        }

        quran.onclick = () => {
            window.location.href = '/quran.html'
        }

        more.onclick = () => {
            window.location.href = '/more.html'
        }

    } catch (error) {

        error_handling(error);

    }
}