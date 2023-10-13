import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class AuthenticationService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

  async checkAuth(sessionID: string) {
    const sessionIdWithoutQuotes = sessionID.replace(/['"]+/g, "");
    // console.log("sessionIdWithoutQuotes: ", sessionIdWithoutQuotes);

    const expirationTimeString = await this.redisClient.hget(
      sessionIdWithoutQuotes,
      "access_expires"
    );

    if (expirationTimeString === null) {
      return false;
    }

    const expirationTime = new Date(expirationTimeString);

    const currentTimestamp = new Date();
    const accessExpiresISO = currentTimestamp.toISOString();

    //
    // Check if the access token has expired
    if (expirationTime > currentTimestamp) {
      //access token still valid
      return true;
    } else {
      //set new time for the access token
      currentTimestamp.setHours(currentTimestamp.getHours() + 1);
      this.redisClient.hset(
        sessionIdWithoutQuotes,
        "access_expires",
        accessExpiresISO
      );
      return true;
    }
  }

  async logoutUser(sessionID: string) {
    // console.log("sessionID: ", sessionID);
    const sessionIDValue = Object.keys(sessionID)[0];

    const sessionIdWithoutQuotes = sessionIDValue.replace(/['"]+/g, "");
    // console.log("sessionIdWithoutQuotes: ", sessionIdWithoutQuotes);

    const numberOfFieldsDeleted = await this.redisClient.del(
      sessionIdWithoutQuotes
    );

    //means that 1 or more fields got deleted
    return numberOfFieldsDeleted > 0;
  }
}
