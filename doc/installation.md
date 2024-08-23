# دليل التثبيت والإعداد

## نظرة عامة

يوفر هذا الدليل إرشادات حول كيفية تثبيت مشروع Altaqwaa وإعداده لتشغيله محليًا.

## متطلبات النظام

- **Node.js**: يجب أن يكون مثبتًا على النظام (يوصى بالإصدار 14 أو أحدث).
- **MongoDB**: يجب أن يكون مثبتًا ويعمل على النظام.
- **Cordova**: يجب تثبيت Cordova عبر npm:
  ```bash
  npm install -g cordova
  ```

## إعداد البيئة

1. **نسخ ملف الإعدادات**:
   - قم بنسخ ملف `.env.example` إلى `.env` في الجذر.
   - قم بتعديل القيم في `.env` بما يتوافق مع بيئة التشغيل الخاصة بك.

2. **تثبيت الاعتماديات**:
   - **للـ frontend**:
     ```bash
     cd frontend
     npm install
     ```

   - **للـ server**:
     ```bash
     cd server
     npm install
     ```

3. **تشغيل قاعدة البيانات**:
   - تأكد من تشغيل MongoDB على `localhost:27017`.

4. **تشغيل المشروع**:
   - **تشغيل الخادم**:
     ```bash
     cd server
     npm start
     ```

   - **تشغيل التطبيق الأمامي**:
     ```bash
     cd frontend
     npm start
     ```

5. **بناء تطبيق Cordova**:
   - قم ببناء تطبيق Cordova:
     ```bash
     cd cordova
     cordova build
     ```

## تشغيل الاختبارات

- **تشغيل اختبارات الـ frontend**:
  ```bash
  cd frontend
  npm test
  ```

- **تشغيل اختبارات الـ server**:
  ```bash
  cd server
  npm test
  ```

## نشر المشروع

1. **بناء التطبيق الأمامي**:
   ```bash
   cd frontend
   npm run build
   ```

2. **نشر تطبيق Cordova**:
   ```bash
   cd cordova
   cordova build --release
   ```

3. **نشر الخادم**:
   - اتبع التعليمات الخاصة بنشر الخادم على بيئة الإنتاج.