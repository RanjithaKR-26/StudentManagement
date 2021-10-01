import { Test, TestingModule } from '@nestjs/testing';
import { ExcelUploadResolver } from './excel-upload.resolver';
import { ExcelUploadService } from './excel-upload.service';

describe('ExcelUploadResolver', () => {
  let resolver: ExcelUploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelUploadResolver, ExcelUploadService],
    }).compile();

    resolver = module.get<ExcelUploadResolver>(ExcelUploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
