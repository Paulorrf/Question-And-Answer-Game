import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { TagsModule } from "./tags/tags.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { QuestionsModule } from "./questions/questions.module";
import { AnswerModule } from "./answer/answer.module";
import { PortalModule } from './portal/portal.module';

@Module({
  imports: [
    PrismaModule,
    TagsModule,
    AuthModule,
    UsersModule,
    AnswerModule,
    QuestionsModule,
    AnswerModule,
    PortalModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
