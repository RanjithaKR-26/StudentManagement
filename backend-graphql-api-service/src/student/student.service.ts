import { Student } from './entities/student.entity';
import { HttpException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findByEmail(email: string) {
    return this.studentRepository.findOne({ where: { email: email } });
  }
  dob(dob: string) {
    var year = parseInt(dob.substring(0, 4));
    var month = parseInt(dob.substring(5, 7));
    var day = parseInt(dob.substring(8, 10));
    let today = new Date();
    var d = today.getFullYear();
    let age: number = d - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      return age--;
    }
  }

  //create
  async create(createStudentInput: CreateStudentInput) {
    const { name, email, dateofbirth } = createStudentInput;
    let age: number = this.dob(dateofbirth);
    const isUserAvailable = await this.findByEmail(email);
    if (isUserAvailable) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    return await this.studentRepository.save({
      name: name,
      email: email,
      dateofbirth: dateofbirth,
      age: age,
    });
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  //update
  async update(id: string, updateStudentInput: UpdateStudentInput) {
    const { name, dateofbirth, email } = updateStudentInput;
    let age: number = this.dob(dateofbirth);

    const update = await this.studentRepository.update(
      { id: updateStudentInput.id },
      {
        name: name,
        email: email,
        dateofbirth: dateofbirth,
        age: age,
      },
    );
    if (update.affected === 1) {
      return {
        age,
        name,
        email,
        dateofbirth,
      };
    }
  }

  //delete
  async remove(id: string) {
    const Student = await this.studentRepository.findOne(id);
    if (!Student) {
      throw new HttpException('Not Found', 404);
    }
    const del = await this.studentRepository.delete(id);
    if (del.affected === 1) {
      return Student;
    }
  }
}
