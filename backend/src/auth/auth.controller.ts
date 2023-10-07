import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

import { AuthService } from "./auth.service";

@Controller("")
export class AuthGoogleController {
  constructor(private readonly authService: AuthService) {}
  //
  @Get("")
  async checkAuth(@Req() req: Request) {
    await this.authService.checkAuth(req.cookies);
  }
}
