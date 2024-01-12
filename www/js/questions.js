import error_handling from "./modules/error_handling.js";
import loadJson from "./modules/loadJson.js";

export default async () => {

    try {

        if (window.location.pathname === '/pages/questions.html') {
            // عرض رمز التحميل أثناء جلب البيانات
            const loading = document.getElementById('loading');
            loading.style.display = "block";
            const mainJson = await loadJson("/data/quiz/main.json");
            const storage = window.localStorage;
            const back = document.getElementById('back');
            const more_header_title = document.getElementById('more_header_title');
            const questions_pages = document.getElementById('questions_pages');
            const questions_pages_2 = document.getElementById('questions_pages_2');
            const questions_pages_3 = document.getElementById('questions_pages_3');
            const questions_pages_4 = document.getElementById('questions_pages_4');

            const backClickHandler = e => {
                window.location.href = "/more.html";
            };

            back.addEventListener("click", backClickHandler);

            const m3lama_dorar_categories = document.getElementById("m3lama_dorar_categories");

            for (const item of mainJson?.categories) {
                const li = document.createElement("li");
                const img = document.createElement("img");
                const h4 = document.createElement("h4");
                const p = document.createElement("p");

                m3lama_dorar_categories.appendChild(li);
                li.appendChild(img);
                img.src = item?.icons;
                li.appendChild(h4);
                h4.innerText = item?.arabicName;
                li.appendChild(p);
                p.innerText = item?.description;

                // الضغط على الفئة
                li.addEventListener("click", async (e) => {
                    window.scrollTo(0, 0);
                    e.stopPropagation();

                    more_header_title.innerText = ` مساق ${item?.arabicName}`;
                    questions_pages.style.display = "none";
                    questions_pages_2.style.display = "block";
                    questions_pages_3.style.display = "none";
                    questions_pages_4.style.display = "none";



                    const topic_items = document.getElementById("topic_items");
                    // تفريغ قائمة المواضيع السابقة قبل إضافة المواضيع الجديدة
                    topic_items.innerHTML = "";

                    // إزالة حدث الرجوع السابق
                    back.removeEventListener("click", backClickHandler);


                    // حدث الرجوع للخلف (صفحة الأسئلة)
                    const backClickHandlerPage2 = e => {
                        window.scrollTo(0, 0);
                        more_header_title.innerText = "أسئلة دينية";
                        questions_pages_2.style.display = "none";
                        questions_pages.style.display = "block";
                        questions_pages_3.style.display = "none";
                        questions_pages_4.style.display = "none";

                        // إعادة إضافة الحدث الأصلي
                        back.addEventListener("click", backClickHandler);
                    };


                    back.addEventListener("click", backClickHandlerPage2);

                    const questionsJson = await loadJson(`/data/quiz/${item?.englishName}.json`);

                    let num = 1;
                    for (const iterator of questionsJson?.DataArray) {

                        const li_topic = document.createElement("li");
                        const img = document.createElement("img");
                        const h4 = document.createElement("h4");
                        topic_items.appendChild(li_topic);
                        li_topic.appendChild(img);
                        img.src = questionsJson?.icons;
                        li_topic.appendChild(h4);
                        h4.innerText = iterator?.arabicName;
                        const topicID = num++

                        li_topic.addEventListener("click", (e) => {
                            e.stopPropagation();
                            window.scrollTo(0, 0);


                            const questions_level = document.getElementById("questions_level");
                            // تفريغ صفحة تحديد مستوى الأسئلة
                            questions_level.innerHTML = "";

                            more_header_title.innerText = "اختر مستوى الأسئلة";
                            questions_pages.style.display = "none";
                            questions_pages_2.style.display = "none";
                            questions_pages_3.style.display = "flex";
                            questions_pages_4.style.display = "none";
                            // إزالة حدث الرجوع السابق
                            back.removeEventListener("click", backClickHandlerPage2);

                            // حدث الرجوع للخلف (صفحة المواضيع)
                            const backClickHandlerPage3 = e => {
                                window.scrollTo(0, 0);
                                more_header_title.innerText = ` مساق ${item?.arabicName}`;
                                questions_pages.style.display = "none";
                                questions_pages_2.style.display = "block";
                                questions_pages_3.style.display = "none";
                                questions_pages_4.style.display = "none";

                                // إعادة إضافة الحدث الخاص بصفحة 2
                                back.addEventListener("click", backClickHandlerPage2);
                            };

                            back.addEventListener("click", backClickHandlerPage3);

                            for (let index = 1; index <= 3; index++) {
                                const li_level = document.createElement("li");
                                const img = document.createElement("img");

                                questions_level.appendChild(li_level);
                                li_level.appendChild(img);
                                img.src = `/img/level-${index}.png`
                                img.alt = `level-${index}`

                                li_level.addEventListener("click", (e) => {
                                    e.stopPropagation();
                                    window.scrollTo(0, 0);
                                    more_header_title.innerText = `${iterator?.arabicName} - المستوى ${index}`;
                                    questions_pages.style.display = "none";
                                    questions_pages_2.style.display = "none";
                                    questions_pages_3.style.display = "none";
                                    questions_pages_4.style.display = "flex";

                                    // إزالة حدث الرجوع السابق
                                    back.removeEventListener("click", backClickHandlerPage3);


                                    // حدث الرجوع للخلف (صفحة تحديد مستوى الأسئلة)
                                    const backClickHandlerPage4 = e => {
                                        window.scrollTo(0, 0);
                                        more_header_title.innerText = "اختر مستوى الأسئلة";
                                        questions_pages_3.style.display = "flex";
                                        questions_pages_2.style.display = "none";
                                        questions_pages.style.display = "none";
                                        questions_pages_4.style.display = "none";

                                        // إعادة إضافة الحدث الأصلي
                                        back.addEventListener("click", backClickHandlerPage3);
                                    };

                                    back.addEventListener("click", backClickHandlerPage4);


                                    const m3lama = {
                                        category: item?.arabicName,
                                        categoryID: item?.id,
                                        topic: iterator?.arabicName,
                                        topicID: topicID,
                                        level: index,
                                    }

                                    // تحويل Object إلى سلسلة نصية JSON وحفظها في localStorage
                                    storage.setItem('m3lama', JSON.stringify(m3lama));

                                    window.location.href = "/pages/questions_page_2.html";
                                });

                            }

                        })
                    }


                });
            }

            await new Promise(r => setTimeout(r, 1500));
            loading.style.display = "none";

        }


        // الصفحة الخاصة بالأسئلة

        if (window.location.pathname === '/pages/questions_page_2.html') {

            // عرض رمز التحميل أثناء جلب البيانات
            const loading = document.getElementById('loading');
            loading.style.display = "block";
            const storage = window.localStorage;
            const back = document.getElementById('back');
            const more_header_title = document.getElementById('more_header_title');

            const backClickHandler = e => {
                window.location.href = "/pages/questions.html";
            };

            back.addEventListener("click", backClickHandler);

            // استرجاع السلسلة النصية JSON من localStorage
            const storedM3lamaString = storage.getItem('m3lama');
            // تحويل السلسلة النصية إلى مصفوفة باستخدام JSON.parse
            const storedM3lama = JSON.parse(storedM3lamaString);
            const mainJson = await loadJson("/data/quiz/main.json");
            const categoryEn = mainJson?.categories?.[storedM3lama?.categoryID - 1]?.englishName;
            const categoryJson = await loadJson(`/data/quiz/${categoryEn}.json`);
            const filenameQu = categoryJson?.DataArray?.[storedM3lama?.topicID - 1]?.files?.[storedM3lama?.level - 1]?.path;
            const questionsJson = await loadJson(filenameQu);
            // const questionsRandom = questionsJson[Math.floor(Math.random() * questionsJson.length)];
            const shuffledQuestions = shuffleArray(questionsJson);

            more_header_title.innerText = `${storedM3lama?.topic} - المستوى ${storedM3lama?.level}`

            const questions = document.getElementById("questions");
            const question_result = document.getElementById("question_result");

            // خارج حلقة الأسئلة
            let quizResults = {
                correctCount: 0,
                wrongCount: 0,
                correctAnswers: [],
                wrongAnswers: []
            };

            for (const [index, iterator] of shuffledQuestions.entries()) {

                const question = document.createElement("div");
                const question_number = document.createElement("p");
                const questions_q = document.createElement("h3");
                const answers_box = document.createElement("ul");

                questions.appendChild(question);
                question.className = "question";
                question.appendChild(question_number);
                question_number.className = "question_number";
                question_number.innerText = index + 1;
                question.appendChild(questions_q);
                questions_q.className = "questions_q";
                questions_q.innerText = iterator?.q;
                question.appendChild(answers_box);
                answers_box.className = "answers_box";


                const shuffledAnswers = shuffleArray(iterator?.answers);
                let clickDisabled = false; // متغير لتتبع ما إذا كان النقر معطلًا أم لا

                for (const [index, lop] of shuffledAnswers.entries()) {

                    const li = document.createElement("li");
                    const answer_number = document.createElement("p");
                    const answer = document.createElement("p");

                    answers_box.appendChild(li);
                    li.appendChild(answer_number);
                    answer_number.className = "answer_number";
                    answer_number.innerText = index + 1;
                    li.appendChild(answer);
                    answer.className = "answer";
                    answer.innerText = lop?.answer;

                    const answerClickHandler = e => {
                        if (!clickDisabled) {
                            const backgroundColorVar = lop?.t === 1 ? "var(--background_div_hover)" : "var(--red)";
                            applyStylesToElement(li, backgroundColorVar);

                            // تحديد ما إذا كانت الإجابة صحيحة أم خاطئة
                            if (lop?.t === 1) {
                                quizResults.correctCount++;
                                quizResults.correctAnswers.push({
                                    question: iterator?.q,
                                    correctAnswer: lop?.answer
                                });
                            } else {
                                const correctAnswerText = iterator?.answers.find(a => a.t === 1)?.answer;
                                const correctAnswerElements = Array.from(answers_box.children).filter(child => {
                                    const answerText = child.querySelector('.answer')?.innerText.trim();
                                    return answerText === correctAnswerText.trim();
                                });
                                quizResults.wrongCount++;
                                quizResults.wrongAnswers.push({
                                    element: correctAnswerElements[0],
                                    question: iterator?.q,
                                    incorrectAnswer: lop?.answer,
                                    correctAnswer: correctAnswerText
                                });
                            }

                            clickDisabled = true; // تعطيل النقر بعد النقر الأول

                        }
                    };

                    li.addEventListener("click", answerClickHandler);


                }

            }


            question_result.style.display = "block";
            question_result.addEventListener("click", () => {
                window.scrollTo(0, 0);
                // عرض النتيجة
                console.log("نتائج الاختبار: ", quizResults);
                // عدد الأسئلة الكلي
                const totalQuestions = 20;

                // عدد الأسئلة الصحيحة
                const correctAnswers = quizResults?.correctCount;

                // حساب نسبة الصحيحة بالنسبة المئوية
                const percentage = (correctAnswers / totalQuestions) * 100;

                for (const iterator of quizResults.wrongAnswers) {
                    applyStylesToElement(iterator.element, "#4c7fc7");
                }

                const main_alert_icon = document.getElementById("main_alert_icon");
                const questions_alert_text = document.getElementById("questions_alert_text");
                const score_percentage = document.getElementById("score_percentage");
                const correct = document.getElementById("correct");
                const mistake = document.getElementById("mistake");

                if (quizResults.wrongCount >= quizResults.correctCount) {

                    main_alert_icon.src = "/img/emoji-Dislike.png";
                    questions_alert_text.innerText = "للأسف، لم تقم بالإجابة بشكل صحيح. لا تيأس، حاول مرة أخرى وستتحسن!";
                }

                else {
                    main_alert_icon.src = "/img/emoji-like.png";
                    questions_alert_text.innerText = "أحسنت! لقد قمت بالإجابة بشكل جيد على معظم الأسئلة."
                }

                score_percentage.innerText = `${percentage}%`;
                correct.innerText = quizResults.correctCount;
                mistake.innerText = quizResults.wrongCount;


                const box_alert = document.getElementById("box_alert");

                showAndCountdown(10);


            });

            await new Promise(r => setTimeout(r, 1000));
            loading.style.display = "none";

        }


    } catch (error) {
        error_handling(error);
    }
}



/**
 * ترتيب مصفوفة بشكل عشوائي.
 *
 * @param {Array} array - المصفوفة التي تحتاج إلى الترتيب العشوائي.
 * @returns {Array} - مصفوفة جديدة تحتوي على العناصر مرتبة بشكل عشوائي.
 * @throws {Error} - إذا لم يتم توفير مصفوفة أو إذا كانت المصفوفة فارغة.
 */
function shuffleArray(array) {
    // التحقق من توفر المصفوفة وأنها غير فارغة
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('يجب توفير مصفوفة غير فارغة للترتيب العشوائي.');
    }

    // إنشاء نسخة جديدة من المصفوفة لتجنب التأثير الجانبي
    const shuffledArray = array.slice();

    // ترتيب العناصر بشكل عشوائي
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}


/**
 * يقوم بتطبيق أنماط محددة على عنصر HTML.
 *
 * @param {HTMLElement} element - العنصر HTML الذي سيتم تطبيق الأنماط عليه.
 * @param {string} backgroundColorVar - المتغير المستخدم لتحديد لون خلفية العنصر.
 * @returns {void} - هذه الوظيفة لا تعيد أي قيمة.
 */
function applyStylesToElement(element, backgroundColorVar) {
    // التحقق مما إذا كان العنصر المقدم صالحًا كعنصر HTML
    if (!element || !(element instanceof HTMLElement)) {
        console.error("يجب توفير عنصر HTML صالح.");
        return;
    }

    // تطبيق الأنماط على العنصر
    element.style.backgroundColor = backgroundColorVar;
    element.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
}


/**
 * عرض عنصر وتنفيذ المؤقت لعكس حالته بعد فترة زمنية محددة.
 * @param {number} duration - مدة الوقت في ثوانٍ لعرض العنصر.
 */
function showAndCountdown(duration) {
    const boxAlert = document.getElementById("box_alert");
    const timer = document.getElementById("timer");

    // عرض العنصر
    boxAlert.style.display = "block";

    /**
     * دالة تنفيذ المؤقت.
     */
    const countdown = () => {
        duration--;

        if (duration <= 0) {
            boxAlert.style.display = "none"
            timer.innerText = "";
        } else {
            timer.innerText = duration;
            // استمر في تنفيذ نفس الدالة بعد مرور ثانية واحدة
            setTimeout(countdown, 1000);
        }
    };

    // بدء المؤقت
    countdown();
}