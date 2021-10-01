import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Upload } from 'graphql-upload';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ExcelUploadModule } from './excel-upload/excel-upload.module';
import { GraphQLWithUploadModule } from './graphql-upload-middleware';

@Module({
  imports: [
    GraphQLWithUploadModule.forRoot(),
    ExcelUploadModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Upload],
})
export class AppModule {}
