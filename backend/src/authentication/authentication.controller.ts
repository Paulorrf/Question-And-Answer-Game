import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateAuthenticationDto } from "./dto/create-authentication.dto";
import { UpdateAuthenticationDto } from "./dto/update-authentication.dto";
import { Request } from "express";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("check-auth")
  async checkAuth(@Req() req: Request, @Body() sessionID: string) {
    try {
      const cookies = req.cookies;

      const sessionId = Object.keys(sessionID)[0];

      // console.log("Cookies:", cookies);
      // console.log("sessionid:", sessionId);
      // console.log("cookies:", cookies);

      //
      // Assume this is an asynchronous operation
      const result = await this.authenticationService.checkAuth(sessionId);
      // const result = await this.authenticationService.checkAuth(cookies);

      // Continue processing with the result
      return result;
    } catch (error) {
      // Handle errors if necessary
      console.error("Error:", error);
      return { error: "An error occurred" };
    }
  }

  // @Get("")
  // findAll() {
  //   return this.authenticationService();
  // }

  @Post("logout")
  async logoutUser(@Body() sessionID: string) {
    return this.authenticationService.logoutUser(sessionID);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authenticationService.remove(+id);
  }
}
