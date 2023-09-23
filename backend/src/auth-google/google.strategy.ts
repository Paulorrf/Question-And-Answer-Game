import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

// https://oauth2.googleapis.com/token

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        "275383730783-mkeff6eljpl3lr4i1hn3eft762ktat2q.apps.googleusercontent.com",
      clientSecret: "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",
      // callbackURL: "http://localhost:3000/api/auth/google/redirect",
      callbackURL: "http://localhost:5000/auth-google/google/callback",
      // callbackURL: "http://localhost:5000/auth-google",
      scope: ["email", "profile"],
    });
  }

  //needed to obtain the refresh token
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: "offline",
    };
  }

  // http://localhost:5000/auth-google

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
