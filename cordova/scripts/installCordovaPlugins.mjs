// scripts/installCordovaPlugins.mjs
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const plugins = [
  'cordova-plugin-camera',
  'cordova-plugin-device',
  // أضف هنا أسماء الإضافات الأخرى التي تحتاجها
];

const installCordovaPlugins = async () => {
  try {
    for (const plugin of plugins) {
      console.log(`Installing ${plugin}...`);
      await execPromise(`cordova plugin add ${plugin}`);
      console.log(`${plugin} installed successfully.`);
    }
  } catch (error) {
    console.error('Error installing plugins:', error);
  }
};

installCordovaPlugins();
