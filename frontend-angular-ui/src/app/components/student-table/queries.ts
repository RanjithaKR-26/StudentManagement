import gql from 'graphql-tag';

export const getStudentsQuery = gql`
  query {
    findAllStudents {
      id
      name
      email
      dateofbirth
      age
    }
  }
`;

export const addStudentMutation = gql`
  mutation ($name: String!, $email: String!, $dateofbirth: String!) {
    createStudent(
      createStudentInput: {
        name: $name
        email: $email
        dateofbirth: $dateofbirth
      }
    ) {
      id
      name
      email
      dateofbirth
      age
    }
  }
`;

export const updateStudentMutation = gql`
  mutation (
    $id: String!
    $name: String!
    $email: String!
    $dateofbirth: String!
  ) {
    updateStudent(
      updateStudentInput: {
        id: $id
        name: $name
        email: $email
        dateofbirth: $dateofbirth
      }
    ) {
      age
      name
      email
      dateofbirth
    }
  }
`;

export const deleteStudentMutation = gql`
  mutation ($studentId: String!) {
    removeStudent(id: $studentId) {
      __typename
    }
  }
`;
