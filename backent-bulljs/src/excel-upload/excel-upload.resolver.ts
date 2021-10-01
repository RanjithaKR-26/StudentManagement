import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExcelUploadService } from './excel-upload.service';
import { ExcelUpload } from './entities/excel-upload.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Logger } from '@nestjs/common';

@Resolver('Excel')
export class ExcelUploadResolver {
  constructor(private readonly excelUploadService: ExcelUploadService) {}

  @Query(() => [ExcelUpload], { name: 'excelUpload' })
  findAll() {
    return this.excelUploadService.findAll();
  }

  @Mutation(() => String)
  async uploadFile(
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
    })
    { createReadStream, filename }: FileUpload,
  ) {
    let test = await new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve('true'))
        .on('error', (e) => {
          reject('false');
          Logger.log(e, 'rejected');
        });

      setTimeout(() => {
        this.excelUploadService.read(filename);
      }, 1000);
    });
    return test;
  }
}
