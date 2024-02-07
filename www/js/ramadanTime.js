import error_handling from "./modules/error_handling.js";
import remainingTimeUntilRamadan from './modules/getRamadanDate.js';

export default async () => {

    try {
        if (window.location.pathname === "/pages/ramadanTime.html") {

            const loadingElement = document.getElementById('loading');
            loadingElement.style.display = "block";
            const back = document.getElementById('back');
            back.addEventListener("click", e => {
                window.location.href = "/more.html";
            });


            const title_ramadan = document.getElementById('title_ramadan');
            const isRamadan = document.getElementById('isRamadan');
            const NotRamadan = document.getElementById('NotRamadan');
            const seconds_r = document.getElementById('seconds_r');
            const minutes_r = document.getElementById('minutes_r');
            const hours_r = document.getElementById('hours_r');
            const days_r = document.getElementById('days_r');

            const timeUntilRamadan = remainingTimeUntilRamadan();

            if (timeUntilRamadan.isRamadan) {
                NotRamadan.style.display = "none";
                title_ramadan.style.display = "none";
                isRamadan.style.display = "block";
            }

            else {
                isRamadan.style.display = "none";
                title_ramadan.style.display = "block";
                NotRamadan.style.display = "flex";
                seconds_r.innerText = timeUntilRamadan.seconds;
                minutes_r.innerText = timeUntilRamadan.minutes;
                hours_r.innerText = timeUntilRamadan.hours;
                days_r.innerText = timeUntilRamadan.days;
            }



            setInterval(() => {
                const timeUntilRamadan = remainingTimeUntilRamadan();

                if (timeUntilRamadan.isRamadan) {
                    NotRamadan.style.display = "none";
                    title_ramadan.style.display = "none";
                    isRamadan.style.display = "block";
                }

                else {
                    isRamadan.style.display = "none";
                    title_ramadan.style.display = "block";
                    NotRamadan.style.display = "flex";
                    seconds_r.innerText = timeUntilRamadan.seconds;
                    minutes_r.innerText = timeUntilRamadan.minutes;
                    hours_r.innerText = timeUntilRamadan.hours;
                    days_r.innerText = timeUntilRamadan.days;
                }
                // console.log(`الوقت المتبقي حتى دخول شهر رمضان: ${timeUntilRamadan.days} يوم ${timeUntilRamadan.hours} ساعة ${timeUntilRamadan.minutes} دقيقة ${timeUntilRamadan.seconds} ثانية.`);
            }, 1000);


            await new Promise(r => setTimeout(r, 2000));
            loadingElement.style.display = "none";
        }
    } catch (error) {
        error_handling(error);
    }
}