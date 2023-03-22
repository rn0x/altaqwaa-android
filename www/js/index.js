import footer from './footer.js';
import adhkar from './adhkar.js';
import prayer from './prayer.js';
import quran from './quran.js';
import notification from './notification.js';
import more from './more.js';
import albitaqat from './albitaqat.js';
import hisnmuslim from './hisnmuslim.js';
import radio from './radio.js';
import tfs from './tfs.js';

document.addEventListener('deviceready', async (e) => {



}, false);

await footer();
await adhkar();
await prayer();
await quran();
await more();
await albitaqat();
await hisnmuslim();
await radio();
await tfs();
await notification();