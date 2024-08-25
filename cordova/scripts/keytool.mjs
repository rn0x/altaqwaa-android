/**
 * @fileoverview
 * هذا الملف يحتوي على سكربت لإنشاء keystore باستخدام `keytool` وتحديث ملف `build.json`.
 * يتضمن السكربت أيضًا قراءة القيم من ملف البيئة `.env`.
 *
 * يتم تنفيذ هذا السكربت باستخدام Node.js.
 * 
 * @module scripts/keytool
 */

import dotenv from 'dotenv';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// تحميل متغيرات البيئة من ملف .env
dotenv.config();

// الحصول على مسار الدليل الحالي
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * اسم ملف keystore الذي سيتم إنشاؤه.
 * @type {string}
 */
const keystoreName = path.join(__dirname, 'release.keystore');

/**
 * كلمة مرور المتجر (store password) للـ keystore.
 * @type {string}
 */
const storePassword = process.env.STORE_PASSWORD;

/**
 * الاسم المستعار (alias) للمفتاح داخل الـ keystore.
 * @type {string}
 */
const alias = process.env.ALIAS;

/**
 * كلمة مرور المفتاح (key password).
 * @type {string}
 */
const keyPassword = process.env.KEY_PASSWORD;

/**
 * معلومات الاسم (dname) لإنشاء شهادة keystore.
 * @typedef {Object} DNameInfo
 * @property {string} CN - Common Name، اسم الكيان.
 * @property {string} OU - Organizational Unit، وحدة التنظيم.
 * @property {string} O - Organization، المؤسسة.
 * @property {string} L - Locality، المدينة.
 * @property {string} S - State، الولاية أو المقاطعة.
 * @property {string} C - Country، البلد.
 */

/**
 * معلومات الاسم (dname) لإنشاء شهادة keystore.
 * @type {DNameInfo}
 */
const dname = {
    CN: process.env.DNAME_CN,
    OU: process.env.DNAME_OU,
    O: process.env.DNAME_O,
    L: process.env.DNAME_L,
    S: process.env.DNAME_S,
    C: process.env.DNAME_C
};

/**
 * الأمر المستخدم لإنشاء keystore باستخدام `keytool`.
 * @type {string[]}
 */
const keytoolCmd = [
    '-genkey',
    '-v',
    '-keystore', keystoreName,
    '-alias', alias,
    '-keyalg', 'RSA',
    '-keysize', '2048',
    '-validity', '10000',
    '-storepass', storePassword,
    '-keypass', keyPassword,
    '-dname', `CN=${dname.CN}, OU=${dname.OU}, O=${dname.O}, L=${dname.L}, S=${dname.S}, C=${dname.C}`,
    '-noprompt'
];

console.log(`Executing command: keytool ${keytoolCmd.join(' ')}`);

/**
 * تنفيذ أمر `keytool` لإنشاء keystore وتحديث ملف `build.json`.
 */
const keytoolProcess = spawn('keytool', keytoolCmd);

keytoolProcess.on('close', (code) => {
    if (code === 0) {
        // إذا كانت القيمة 0، فهذا يعني أن العملية تمت بنجاح
        console.log('Keystore created successfully.');

        /**
        * كائن تكوين `build.json`.
        * @type {Object}
        * @property {Object} android - إعدادات أندرويد.
        * @property {Object} android.debug - إعدادات وضع التصحيح (debug).
        * @property {string} android.debug.keystore - مسار ملف keystore.
        * @property {string} android.debug.storePassword - كلمة مرور المتجر (store password).
        * @property {string} android.debug.alias - الاسم المستعار (alias).
        * @property {string} android.debug.password - كلمة مرور المفتاح (key password).
        * @property {string} android.debug.keystoreType - نوع keystore.
        * @property {string} android.debug.packageType - نوع الحزمة.
        * @property {Object} android.release - إعدادات وضع الإصدار (release).
        * @property {string} android.release.keystore - مسار ملف keystore.
        * @property {string} android.release.storePassword - كلمة مرور المتجر (store password).
        * @property {string} android.release.alias - الاسم المستعار (alias).
        * @property {string} android.release.password - كلمة مرور المفتاح (key password).
        * @property {string} android.release.keystoreType - نوع keystore.
        * @property {string} android.release.packageType - نوع الحزمة.
        */
        const buildConfig = {
            "android": {
                "debug": {
                    "keystore": `${keystoreName}`,
                    "storePassword": storePassword,
                    "alias": alias,
                    "password": keyPassword,
                    "keystoreType": "",
                    "packageType": "apk"
                },
                "release": {
                    "keystore": `${keystoreName}`,
                    "storePassword": storePassword,
                    "alias": alias,
                    "password": keyPassword,
                    "keystoreType": "",
                    "packageType": "apk"
                }
            }
        };

        /**
         * كتابة ملف `build.json` إلى نظام الملفات.
         */
        fs.writeFileSync('build.json', JSON.stringify(buildConfig, null, 2));
        console.log('build.json file created successfully.');
    } else {
        // إذا كانت القيمة غير 0، فهذا يعني حدوث خطأ
        console.error('Failed to create keystore. Please check the error messages above.');
    }
});