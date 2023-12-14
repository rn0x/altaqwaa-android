import error_handling from './modules/error_handling.js';

export default async () => {

    if (window.location.pathname === '/pages/sabha.html') {

        try {

            let storage = window.localStorage;
            let back = document.getElementById('back');
            let sabha_number = document.getElementById('sabha_number');
            let sabha = document.getElementById('sabha');
            let repetition_bt = document.getElementById('repetition_bt');

            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });

            sabha.addEventListener("click", e => {

                let number = Number(sabha_number.innerText) + 1;
                sabha_number.innerText = number;
                let adhkarRepeat = storage.getItem('adhkarRepeat');
                storage.setItem("adhkarRepeat", Number(adhkarRepeat ? adhkarRepeat : 0) + 1);

            });

            repetition_bt.addEventListener("click", e => {
                e.stopPropagation();
                sabha_number.innerText = 0;
            });



        } catch (error) {

            error_handling(error);

        }

    }

}