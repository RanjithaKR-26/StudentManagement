import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create student', async () => {
    const entry: CreateStudentInput = {
      name: 'student',
      email: 'student@g.com',
      dateofbirth: '2000/03/03',
    };

    const studentSpy = jest.spyOn(service, 'create');
    service.create(entry);
    expect(studentSpy).toHaveBeenCalledWith(entry);
  });

  it('should create students', async () => {
    const entry: CreateStudentInput = {
      name: 'student',
      email: 'student@g.com',
      dateofbirth: '2000/03/03',
    };

    const studentSpy = jest.spyOn(service, 'create');
    service.create(entry);
    expect(studentSpy).toHaveBeenCalledWith(entry);
  });

  it('should get student', async () => {
    const studentSpy = jest.spyOn(service, 'findAll');
    service.findAll();
    expect(studentSpy).toHaveBeenCalled();
  });
});
