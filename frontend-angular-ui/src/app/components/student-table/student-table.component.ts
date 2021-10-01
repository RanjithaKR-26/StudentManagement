import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/Student';
import { NotificationService } from '@progress/kendo-angular-notification';
import { StudentService } from './student.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import * as SC from 'socketcluster-client';
import { getStudentsQuery } from './queries';
import { DialogAction } from '@progress/kendo-angular-dialog';

let socket = SC.create({
  hostname: 'localhost',
  port: 8002,
});

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})
export class StudentTableComponent implements OnInit {
  items: Student[] = [];
  public file = '';
  public formGroup!: FormGroup;
  public pageSize = 5;
  public skip = 0;
  public gridView!: GridDataResult;
  public opened = false;
  public myActions = [{ text: 'Yes', primary: true }];

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService,
    private studentService: StudentService
  ) {}

  public close(status: any) {
    console.log(status);
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  public onAction(action: DialogAction): void {
    this.removeHandler;
    this.opened = false;
  }

  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
    {
      field: 'name',
      dir: 'asc',
    },
  ];

  ngOnInit() {
    this.fetchData();
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadItems();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: orderBy(
        this.items.slice(this.skip, this.skip + this.pageSize),
        this.sort
      ),
      total: this.items.length,
    };
  }

  async fetchData() {
    const query = await this.apollo.watchQuery<any>({
      query: getStudentsQuery,
    });

    await query.valueChanges.subscribe(({ data }) => {
      this.items = data.findAllStudents;
      this.loadItems();
    });
  }

  public editHandler({
    sender,
    rowIndex,
    dataItem,
  }: {
    sender: any;
    rowIndex: any;
    dataItem: any;
  }) {
    this.formGroup = new FormGroup({
      name: new FormControl(dataItem.name, Validators.required),
      email: new FormControl(dataItem.email, Validators.required),
      dateofbirth: new FormControl(dataItem.dateofbirth, Validators.required),
      id: new FormControl(dataItem.id, Validators.required),
    });

    sender.editRow(rowIndex, this.formGroup);
  }

  public saveHandler({
    sender,
    rowIndex,
    isNew,
  }: {
    sender: any;
    rowIndex: any;
    formGroup: any;
    isNew: any;
  }) {
    if (isNew) {
      const query = this.studentService.createStudent(
        this.formGroup.value.name,
        this.formGroup.value.email,
        this.formGroup.value.dateofbirth
      );

      query.subscribe(() => {
        this.AddNotification();
        this.fetchData();
      });

      sender.closeRow(rowIndex);
    } else {
      const query = this.studentService.updateStudent(
        this.formGroup.value.id,
        this.formGroup.value.name,
        this.formGroup.value.email,
        this.formGroup.value.dateofbirth
      );

      query.subscribe(() => {
        this.UpdateNotification();
        this.fetchData();
      });

      sender.closeRow(rowIndex);
    }
  }

  public cancelHandler({ sender, rowIndex }: { sender: any; rowIndex: any }) {
    sender.closeRow(rowIndex);
  }

  public addHandler({ sender }: { sender: any }) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dateofbirth: new FormControl('', Validators.required),
      id: new FormControl(0, Validators.required),
    });

    sender.addRow(this.formGroup);
  }

  public removeHandler({
    dataItem,
    sender,
    rowIndex,
  }: {
    dataItem: any;
    sender: any;
    rowIndex: any;
  }) {
    const query = this.studentService.deleteStudent(dataItem.id);

    query.subscribe(() => {
      this.DeleteNotification();
      this.fetchData();
    });

    sender.closeRow(rowIndex);
  }

  public DeleteNotification(): void {
    this.notificationService.show({
      content: 'Deleted Student',
      hideAfter: 5000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 3000 },
      type: { style: 'error', icon: true },
    });
  }

  public AddNotification(): void {
    this.notificationService.show({
      content: 'Student Added',
      hideAfter: 3000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 3000 },
      type: { style: 'success', icon: true },
    });
  }

  public UpdateNotification(): void {
    this.notificationService.show({
      content: 'Student Updated',
      hideAfter: 3000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 3000 },
      type: { style: 'warning', icon: true },
    });
  }

  async onUpload(event: any) {
    event.preventDefault();
    const file = event.files[0].rawFile;
    await this.studentService
      .uploadFile(file)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          window.location.reload();
          // this.fetchData();
        }, 3000);
      })
      .catch((e) => console.log(e));
    (async () => {
      let channel = socket.subscribe('student');
      for await (let data of channel) {
        if (data) {
          this.notificationService.show({
            content: `Job completed succesfully.`,
            hideAfter: 3000,
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 900 },
            type: { style: 'success', icon: true },
          });
        }
      }
    })();
    (async () => {
      let channel = socket.subscribe('studentF');
      for await (let data of channel) {
        if (data) {
          this.notificationService.show({
            content: `Job Failed, please retry.`,
            hideAfter: 3000,
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 900 },
            type: { style: 'error', icon: true },
          });
        }
      }
    })();
  }
}
