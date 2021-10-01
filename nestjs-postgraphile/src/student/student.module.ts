import { Module } from "@nestjs/common";

import { Student } from "./entities/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullModule } from "@nestjs/bull";
import { StudentConsumer } from "./student.consume";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    BullModule.registerQueue({
      name: "student",
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
  ],
  providers: [StudentConsumer],
})
export class StudentModule {}
