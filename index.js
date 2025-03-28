import { chromium, firefox, webkit } from "playwright";
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const runBrowser = async (browserLauncher) => {
    let browser = null;

    try {
        browser = await browserLauncher.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        page.on('console', (message) => {
            console.log('PAGE LOG:', message.text());
        });

        await page.addScriptTag({ path: path.join(__dirname, './context-script.js') });

        await page.close();
        await browser.close();
    } catch (error) {
        if (browser !== null) {
            await browser.close();
        }

        throw error;
    }
};

for (const browser of [chromium, firefox, webkit]) {
    console.log(`Running benchmark on ${browser.name()}`);
    await runBrowser(browser);
    console.log(`Finished benchmark on ${browser.name()}`);
    console.log('');
}
