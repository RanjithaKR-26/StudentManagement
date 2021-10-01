import { Injectable } from '@nestjs/common';
import * as reader from 'xlsx';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class ExcelUploadService {
  constructor(@InjectQueue('student') private queue: Queue) {}

  read(filename: string) {
    const file = reader.readFile(`./uploads/${filename}`);
    const sheets = file.SheetNames;
    let data = [];
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    let newArray = [];
    data.map(async (value) => {
      var year = parseInt(value.dateofbirth.substring(0, 4));
      var month = parseInt(value.dateofbirth.substring(5, 7));
      var day = parseInt(value.dateofbirth.substring(8, 10));
      let today = new Date();
      var d = today.getFullYear();
      let age: number = d - year;
      if (
        today.getMonth() < month ||
        (today.getMonth() == month && today.getDate() < day)
      ) {
        age--;
      }
      const createStudentInput: Object = {
        name: value.name,
        email: value.email,
        dateofbirth: value.dateofbirth,
        age: age,
      };
      newArray.push(createStudentInput);
    });
    this.queue.add('create', {
      data: newArray,
    });
  }

  findAll() {
    return `This action returns all excelUpload`;
  }
}
