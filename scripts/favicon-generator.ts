import { favicons } from 'favicons';
import fs from 'fs/promises';
import path from 'path';
import { mkdirp } from 'mkdirp';

const BASE_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.resolve(BASE_DIR, 'lib/client/images/avatar.jpg');
const TEMPLATE_PATH = path.resolve(BASE_DIR, 'lib/server/views/meta.hbs');
const IMAGE_PATH = path.join(BASE_DIR, 'lib/client/images/favicon/');

const configuration = {
  path: "/images/favicon", // Path for overriding default icons path. `string`
  lang: "en-US", // Primary language for name and short_name
  scope: "/", // set of URLs that the browser considers within your app
  icons: {
    android: false, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
};

const main = async () => {
  try {
    const result = await favicons(SOURCE_FILE, configuration);

    await mkdirp(IMAGE_PATH);
    await Promise.all(
      result.images.map(async (image) => {
        const imagePath = path.join(IMAGE_PATH, image.name);
        await fs.writeFile(
          imagePath,
          image.contents,
        );

        console.log(`Wrote image "${imagePath}"`);
      }),
    );

    await fs.writeFile(TEMPLATE_PATH, result.html.join('\n'));
    console.log(`Update meta handlebars template ${TEMPLATE_PATH}`);
  } catch (e) {
    const error = e as Error;
    console.log(error.message); // Error description e.g. "An unknown error has occurred"
  }
};

main();
