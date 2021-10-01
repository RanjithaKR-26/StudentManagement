import postgraphile from "postgraphile";

export const postgraph = postgraphile(
  "postgres://postgres:root123@localhost:5432/students",
  "public",
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
  },
);
