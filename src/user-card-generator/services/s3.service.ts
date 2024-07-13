import { S3Client, GetObjectCommand,PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';




export class S3Service {
    
    private s3Client: S3Client;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        console.log( process.env.BucketName,"BucketName herer------------->")
        this.s3Client = new S3Client({
            region: process.env.Region,
            credentials: {
                accessKeyId: process.env.AccessKeyId,
                secretAccessKey: process.env.secretAccessKey
            },
        });
        this.bucketName = "card-generator-3112";
    }

    async uploadImage(file:any) {
        const uniqueKey = uuidv4();

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: uniqueKey,
            Body: file,
            ContentType: 'image/png',
        });

        const saved = await this.s3Client.send(command);
        
        return this.getImg(uniqueKey)
    }
    async getImg(key) {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        const url = await getSignedUrl(this.s3Client, command)
        return url
    }
}
