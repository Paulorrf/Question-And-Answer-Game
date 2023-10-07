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
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { SessionStoresService } from "src/session-stores/session-stores.service";
import { UsersService } from "src/users/users.service";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

@Controller("auth-google")
export class AuthGoogleController {
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly sessionStoresService: SessionStoresService,
    private readonly usersService: UsersService
  ) {}

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
  async googleAuthRedirect(@Req() req: { user: any }, @Res() res: Response) {
    try {
      const user = req.user; // User data obtained from Google OAuth

      console.log("user::: ", user);

      //saves user in the db if doesn't exist
      const userDataFromDB = await this.usersService.create({
        email: req.user.email,
        name: req.user.firstName,
        // access_tk: req.user.accessToken,
        refresh_tk: req.user.refreshToken,
      });

      console.log("refresh_tk::: ", req.user.refreshToken);

      const currentTimestamp = new Date(); // Current timestamp
      currentTimestamp.setHours(currentTimestamp.getHours() + 1);

      //transforms to string
      const accessExpiresISO = currentTimestamp.toISOString();

      //create a session for the user
      const sessionID = await this.sessionStoresService.create({
        ...userDataFromDB,
        accessToken: req.user.accessToken,
        // refreshToken: req.user.refreshToken,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        access_expires: accessExpiresISO,
      });

      // const userJson = JSON.stringify(user.email);

      const oneDayInSeconds = 60 * 60 * 24; // One day in seconds
      const thirtyDaysInSeconds = oneDayInSeconds * 30; // Thirty days in seconds

      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + thirtyDaysInSeconds * 1000
      );

      // Set the 'userData' cookie with the calculated expiration date
      res.cookie("userData", sessionID, {
        httpOnly: false, // Set to false to allow server-side access
        secure: false, // Set to false for testing on localhost (use true in production with HTTPS)
        expires: expirationDate,
        domain: "localhost", // Make sure domain matches where your backend is running
        path: "/", // Specify the path where the cookie is accessible
      });

      // Redirect the user back to frontend
      return res.redirect("http://localhost:3000/");
    } catch (error) {
      console.error(error);
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
