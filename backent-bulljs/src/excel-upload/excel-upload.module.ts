import { Module } from '@nestjs/common';
import { ExcelUploadService } from './excel-upload.service';
import { ExcelUploadResolver } from './excel-upload.resolver';
import { Upload } from 'graphql-upload';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    Upload,
    BullModule.registerQueue({
      name: 'student',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [ExcelUploadResolver, ExcelUploadService],
})
export class ExcelUploadModule {}
