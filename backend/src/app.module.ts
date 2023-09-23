import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { TagsModule } from "./tags/tags.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { QuestionsModule } from "./questions/questions.module";
import { AnswerModule } from "./answer/answer.module";
import { PortalModule } from "./portal/portal.module";
import { AuthGoogleService } from "./auth-google/auth-google.service";
import { AuthGoogleModule } from "./auth-google/auth-google.module";
import { RedisModule } from './redis/redis.module';

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
    AuthGoogleModule,
    ConfigModule.forRoot(),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthGoogleService],
})
export class AppModule {}
