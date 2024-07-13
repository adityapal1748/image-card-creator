import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCardGeneratorModule } from './user-card-generator/user-card-generator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }),
  UserCardGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
