import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PerguntasModule } from "./perguntas/perguntas.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RespostasModule } from './respostas/respostas.module';

@Module({
  imports: [PerguntasModule, PrismaModule, TagsModule, AuthModule, UsersModule, RespostasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
