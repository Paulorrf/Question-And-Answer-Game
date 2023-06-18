import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { TagsModule } from "./tags/tags.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RespostasModule } from "./respostas/respostas.module";
import { QuestionsModule } from "./questions/questions.module";

@Module({
  imports: [
    PrismaModule,
    TagsModule,
    AuthModule,
    UsersModule,
    RespostasModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
