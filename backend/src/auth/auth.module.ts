import { UsersModule } from "./../users/users.module";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport/dist";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshTokenStrategy } from "./refreshTk.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: "segredo",
      // signOptions: { expiresIn: "20s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
