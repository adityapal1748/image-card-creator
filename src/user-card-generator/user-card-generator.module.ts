import { Module } from '@nestjs/common';
import { CardController } from './controllers/user-card.controller';
import { UserCardGenerator } from './services/user-card-generator.service';
import { ImageService } from './services/image.service';
import { S3Service } from './services/s3.service';
import { TemplateService } from './services/template.service';

@Module({
    controllers:[CardController],
    providers:[UserCardGenerator,S3Service,TemplateService,ImageService]
})
export class UserCardGeneratorModule {}
