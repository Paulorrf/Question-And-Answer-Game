import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AuthGoogleService } from "./auth-google.service";
import { AuthGoogleController } from "./auth-google.controller";
import { GoogleStrategy } from "./google.strategy";
import { SessionStoresService } from "src/session-stores/session-stores.service";
import { UsersService } from "src/users/users.service";
import { RedisModule } from "src/redis/redis.module";

@Module({
  controllers: [AuthGoogleController],
  providers: [
    AuthGoogleService,
    GoogleStrategy,
    SessionStoresService,
    UsersService,
  ],
  imports: [ConfigModule.forRoot(), RedisModule],
})
export class AuthGoogleModule {}
