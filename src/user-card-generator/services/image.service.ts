import * as puppeteer from 'puppeteer';

export class ImageService {
  async htmlToImage(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const imageBuffer = await page.screenshot({ type: 'png',fullPage:true });
    await browser.close();
    return imageBuffer;
  }
}
