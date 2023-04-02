import error_handling from './modules/error_handling.js';

export default async () => {

    if (window.location.pathname === '/pages/sabha.html') {

        try {

            let back = document.getElementById('back');
            let sabha_number = document.getElementById('sabha_number');
            let sabha = document.getElementById('sabha');

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            sabha.addEventListener("click", e => {

                let number = Number(sabha_number.innerText) + 1;
                sabha_number.innerText = number;

            });

        } catch (error) {

            error_handling(error);

        }

    }

}