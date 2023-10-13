import { Controller, Post, Body, Req } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { Request } from "express";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("check-auth")
  async checkAuth(@Req() req: Request, @Body() sessionID: string) {
    try {
      // const cookies = req.cookies;
      const sessionId = Object.keys(sessionID)[0];
      const result = await this.authenticationService.checkAuth(sessionId);
      return result;
    } catch (error) {
      // Handle errors if necessary
      console.error("Error:", error);
      return { error: "An error occurred" };
    }
  }

  @Post("logout")
  async logoutUser(@Body() sessionID: string) {
    return this.authenticationService.logoutUser(sessionID);
  }
}
