import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { AuthGoogleService } from "./auth-google.service";
import { CreateAuthGoogleDto } from "./dto/create-auth-google.dto";
import { UpdateAuthGoogleDto } from "./dto/update-auth-google.dto";
// import { Request } from "@nestjs/common";
import { Response } from "express";

import { AuthGuard } from "@nestjs/passport";

@Controller("auth-google")
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Post()
  create(@Body() createAuthGoogleDto: CreateAuthGoogleDto) {
    return this.authGoogleService.create(createAuthGoogleDto);
  }

  @Get()
  @UseGuards(AuthGuard("google"))
  async signin(@Req() req) {}

  //old one http://localhost:5000/api/auth/google/redirect

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  // @Get("google/callback")
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = req.user; // User data obtained from Google OAuth
      const userJson = JSON.stringify(user);
      const oneDayInSeconds = 60 * 60 * 24; // One day in seconds

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + oneDayInSeconds * 1000); // Convert seconds to milliseconds

      // Set the 'userData' cookie with the calculated expiration date
      res.cookie("userData", userJson, {
        httpOnly: false, // Set to false to allow server-side access
        secure: false, // Set to false for testing on localhost (use true in production with HTTPS)
        expires: expirationDate,
        domain: "localhost", // Make sure domain matches where your backend is running
        path: "/", // Specify the path where the cookie is accessible
      });

      // Redirect the user back to your frontend
      return res.redirect("http://localhost:3000/success");
    } catch (error) {
      console.error(error);
      // Handle errors gracefully and return an error response
      return res.status(500).json({ error: "OAuth callback error" });
    }
  }

  @Get()
  findAll() {
    return this.authGoogleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authGoogleService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAuthGoogleDto: UpdateAuthGoogleDto
  ) {
    return this.authGoogleService.update(+id, updateAuthGoogleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authGoogleService.remove(+id);
  }
}
