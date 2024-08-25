// scripts/moveBuildToCordova.mjs
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// الحصول على مسار الدليل الحالي
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تعيين المسارات
const frontendBuildPath = path.join(__dirname, '..', '..', 'frontend', 'build');
const cordovaWwwPath = path.join(__dirname, '..', 'www');
const gitkeepPath = path.join(cordovaWwwPath, '.gitkeep');

// دالة لنقل مجلد البناء إلى مجلد Cordova
const moveBuildToCordova = async () => {
  try {
    // تحقق مما إذا كان مجلد build موجود
    if (await fs.pathExists(frontendBuildPath)) {
      // تأكد من أن مجلد www موجود
      await fs.ensureDir(cordovaWwwPath);

      // حذف محتويات مجلد www الحالي إذا كان موجودًا
      await fs.emptyDir(cordovaWwwPath);

      // نقل محتويات build إلى www
      await fs.copy(frontendBuildPath, cordovaWwwPath);
      console.log('Build files successfully moved to Cordova www directory.');
      // إنشاء ملف .gitkeep
      await fs.writeFile(gitkeepPath, '');
      console.log('.gitkeep file created successfully.');
    } else {
      console.error('Frontend build directory does not exist.');
    }
  } catch (error) {
    console.error('Error moving build files:', error);
  }
};

moveBuildToCordova();
