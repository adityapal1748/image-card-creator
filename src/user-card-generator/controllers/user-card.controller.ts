import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserCardGenerator } from "../services/user-card-generator.service";
import { UploadImageDto } from "../dtos/uploadImg.dto";

@Controller('upload')
export class CardController {
    constructor(private cardService:UserCardGenerator) {}
  
    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: UploadImageDto,
        @UploadedFile() file: Express.Multer.File
        ) {

        const { firstName, lastName } = body;
        return this.cardService.processData(firstName, lastName, file);
    }
}