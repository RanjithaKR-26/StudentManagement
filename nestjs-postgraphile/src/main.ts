import { postgraph } from "./postgraphile";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.use(postgraph);

  app.listen(5000, () =>
    console.log(`Server running on port 5000`),
  );
}
bootstrap();
