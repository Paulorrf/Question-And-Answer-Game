import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AuthGoogleService } from "./auth-google.service";
import { AuthGoogleController } from "./auth-google.controller";
import { GoogleStrategy } from "./google.strategy";

@Module({
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy],
  imports: [ConfigModule.forRoot()],
})
export class AuthGoogleModule {}
