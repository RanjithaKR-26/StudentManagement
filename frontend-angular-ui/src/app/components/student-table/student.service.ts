import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { request } from 'graphql-request';
import {
  addStudentMutation,
  deleteStudentMutation,
  getStudentsQuery,
  updateStudentMutation,
} from './queries';

const UPLOADFILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const endpoint = `backend-bulljs`;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private apollo: Apollo) {}

  uploadFile(file: any) {
    return request(endpoint, UPLOADFILE, {
      file: file,
    });
  }

  createStudent(name: string, email: string, dateofbirth: string) {
    return this.apollo.mutate({
      mutation: addStudentMutation,
      variables: {
        name: name,
        email: email,
        dateofbirth: dateofbirth,
      },
      refetchQueries: [
        {
          query: getStudentsQuery,
        },
      ],
    });
  }

  updateStudent(id: number, name: string, email: string, dateofbirth: string) {
    return this.apollo.mutate({
      mutation: updateStudentMutation,
      variables: {
        id: id,
        name: name,
        email: email,
        dateofbirth: dateofbirth,
      },
      refetchQueries: [
        {
          query: getStudentsQuery,
        },
      ],
    });
  }

  deleteStudent(id: number) {
    return this.apollo.mutate({
      mutation: deleteStudentMutation,
      variables: {
        studentId: id,
      },
      refetchQueries: [
        {
          query: getStudentsQuery,
        },
      ],
    });
  }
}
