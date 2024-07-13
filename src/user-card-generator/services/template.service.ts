import * as Handlebars from 'handlebars';
import * as fs from 'fs'
import * as path from 'path';



export class TemplateService {
    getUrl() {
        const bgUrl = path.join(__dirname, '../../../assets/bg-img.jpg');

        const imageBufferBG = fs.readFileSync(bgUrl);

        const base64ImageBG = imageBufferBG.toString('base64');

        return { bgUrl: `data:image/jpeg;base64,${base64ImageBG}` }
    }
    getHtml(firstName: string, lastName: string, imageUrl: string): string {
        const { bgUrl } = this.getUrl()
        const template = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body,
            html {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
            }

            .container {
                position: relative;
                width: 100%;
                max-width: 768px;
                /* Adjust as needed */
                margin: 0 auto;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .image-wrapper {
                position: relative;
            }

            .background-image {
                width: 100%;
                height: auto;
                display: block;
            }

            .user-image-container {
                position: absolute;
                top: 32px;
                left: 240px;
                width: 124px;
                height: 118px;
                border: 2px solid yellow;
                box-sizing: border-box;
                overflow: hidden;
                border-radius: 20px;
            }

            .user-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                /* Ensures the image covers the container while maintaining aspect ratio */
            }

            .text-container {
                position: absolute;
                top: 32px;
                left: 240px;
                width: 124px;
                height: 118px;
                margin-left:150px
            }
            .name{
                font-size:18px;
                color:white;
                font-family: Arial, sans-serif;
            }
        </style>
        </head>
        
        <body>
            <div class="container">
                <img src="${bgUrl}" alt="Background Image" class="background-image">
                <div class="user-image-container">
                    <img src="${imageUrl} " alt="User Image" class="user-image">
                </div>
            </div>
            <div class="text-container">
                <p class="name">First Name: ${firstName}</p>
                <p class="name">Last Name: ${lastName}</p>
            </div>
        </div>
        </body>
        
        </html>`
        const compile = Handlebars.compile(template);
        return compile({ firstName, lastName, imageUrl });
    }
}
