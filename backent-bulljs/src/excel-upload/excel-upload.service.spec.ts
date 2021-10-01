import { Test, TestingModule } from '@nestjs/testing';
import { ExcelUploadService } from './excel-upload.service';

describe('ExcelUploadService', () => {
  let service: ExcelUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelUploadService],
    }).compile();

    service = module.get<ExcelUploadService>(ExcelUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
