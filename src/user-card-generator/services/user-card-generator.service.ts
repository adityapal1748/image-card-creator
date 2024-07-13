import { Injectable } from '@nestjs/common';
import { ImageService } from './image.service';
import { S3Service } from './s3.service';
import { TemplateService } from './template.service';

@Injectable()
export class UserCardGenerator {
    constructor(
        private readonly templateService: TemplateService,
        private readonly imageService: ImageService,
        private readonly s3Service: S3Service,
    ) { }

    async processData(firstName: string, lastName: string, file: any) {
        const userImageBase64 = file.buffer.toString('base64');
        const userImageUrl = `data:${file.mimetype};base64,${userImageBase64}`;

        const html = this.templateService.getHtml(firstName, lastName,userImageUrl);

        const imageBuffer = await this.imageService.htmlToImage(html);

        const create = await this.s3Service.uploadImage(imageBuffer)
        return {"url":create}
    }
}
