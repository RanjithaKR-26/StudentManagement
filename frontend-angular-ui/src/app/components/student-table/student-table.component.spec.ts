import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { Apollo } from 'apollo-angular';
import { GraphQLModule } from '../../graphql.module';
import { StudentTableComponent } from './student-table.component';

describe('StudentTableComponent', () => {
  let component: StudentTableComponent;
  let fixture: ComponentFixture<StudentTableComponent>;

  let studentList: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ButtonModule,
        GridModule,
        UploadsModule,
        HttpClientModule,
        GraphQLModule,
      ],
      declarations: [StudentTableComponent],
      providers: [Apollo],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(function () {
    studentList = [
      {
        id: 1,
        name: 'student1',
        email: 'student1@gmail.com',
        dob: '1998/11/13',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', () => {
    const result = component.fetchData();
    expect(result).toBeTruthy();
  });

  it('should have students', () => {
    component.items.length = 2;
    expect(component.items.length).toBeGreaterThan(0);
  });
});
