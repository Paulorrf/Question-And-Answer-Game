import { UsersService } from "./users/users.service";
import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("auth/signin")
  async signin(@Request() req) {
    return this.usersService.create(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    console.log("req user");
    console.log(req.user);
    console.log("req user");
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
