# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

هيكل مجلد المشروع

```
Altaqwaa/
├── frontend/                # يحتوي على تطبيق React
│   ├── translations/          # يحتوي على ملفات الترجمة
│   │   ├── en.json            # الترجمات للغة الإنجليزية
│   │   ├── ar.json            # الترجمات للغة العربية
│   ├── public/              # ملفات HTML و assets العامة
│   ├── src/                 # ملفات المصدر
│   │   ├── components/      # مكونات React القابلة لإعادة الاستخدام
│   │   ├── pages/           # صفحات التطبيق
│   │   ├── hooks/           # هوكات React مخصصة
│   │   ├── context/         # سياقات React لتشارك البيانات
│   │   ├── utils/           # دوال وأدوات مساعدة عامة
│   │   ├── services/        # طبقة التواصل مع الباك اند (API calls)
│   │   ├── styles/          # ملفات CSS/SCSS
│   │   ├── App.js           # نقطة الدخول الرئيسية لتطبيق React
│   │   └── index.js         # الملف الرئيسي الذي يربط React بصفحة HTML
│   ├── package.json         # اعتماديات المشروع في frontend
│   ├── .env                 # متغيرات البيئة الخاصة بالـ React
│   └── README.md            # معلومات المشروع، طريقة الاستخدام، التوثيق الأساسي
├── cordova/                 # يحتوي على ملفات وتكوينات Cordova
│   ├── config.xml           # إعدادات Cordova
│   ├── package.json         # اعتماديات المشروع في cordova
│   └── www/                 # ملفات الإنتاج (مخرجات البناء لـ Cordova)
├── server/                  # يحتوي على تطبيق الباك اند (Express.js أو أي فريم ورك آخر)
│   ├── src/
│   │   ├── controllers/     # التحكم في منطق التطبيق
│   │   ├── models/          # نماذج البيانات (مثل Mongoose للـ MongoDB)
│   │   ├── routes/          # تعريف مسارات الـ API
│   │   ├── middleware/      # الميدل وير المشترك (مثل المصادقة والتحقق)
│   │   ├── services/        # خدمات الطبقة المنطقية (مثل التعامل مع قواعد البيانات)
│   │   ├── utils/           # دوال وأدوات مساعدة مشتركة
│   │   ├── config/          # إعدادات مثل الاتصال بقاعدة البيانات
│   │   ├── app.js           # نقطة دخول سيرفر Express
│   │   └── index.js         # الملف الرئيسي لتشغيل السيرفر
│   ├── package.json         # اعتماديات الباك اند
│   ├── .env                 # متغيرات البيئة الخاصة بالسيرفر
│   └── .gitignore           # استثناءات Git الخاصة بالسيرفر
├── scripts/                 # سكربتات الأتمتة مثل بناء المشروع وتشغيل الاختبارات
│   ├── build-frontend.sh     # سكربت لبناء التطبيق الأمامي
│   ├── start-server.sh      # سكربت لتشغيل الواجهة الخلفية
│   └── deploy.sh            # سكربت لنشر المشروع (الإنتاج)
├── config.cjs                # ملف التكوين المركزي الذي يدمج إعدادات .env
├── .env                     # متغيرات البيئة الخاصة بالمشروع
├── package.json             # معلومات المشروع واعتمادياته المشتركة
├── LICENSE                  # ملف يحتوي على نص الرخصة للمشروع
├── README.md                # معلومات المشروع، طريقة الاستخدام، التوثيق الأساسي
├── doc/                     # وثائق المشروع التفصيلية
│   ├── architecture.md      # توثيق بنية المشروع
│   ├── design.md            # توثيق تصميم واجهة المستخدم وتجربة المستخدم
│   ├── api.md               # توثيق API
│   └── installation.md      # دليل التثبيت والإعداد
└── .gitignore               # استثناءات Git
```
