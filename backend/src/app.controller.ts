import { UsersService } from "./users/users.service";
import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
  Body,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { UpdateStatusDto } from "./users/dto/update-status-dto";

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

  @Get("auth/:id")
  findOneById(@Param("id") id: string) {
    return this.usersService.findOneById(+id);
  }

  @Post("auth/signin")
  async signin(@Request() req) {
    // console.log("eaeaiejidjajds");
    // console.log("req");
    // console.log(req.body);
    // console.log("req");
    return this.usersService.create(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    console.log("req user");
    console.log(req.user);
    console.log("req user");
    return this.authService.login(req.user);
  }

  @Post("auth/updateStatus")
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return this.usersService.updateStatus(updateStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
