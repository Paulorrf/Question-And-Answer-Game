import { Inject, Injectable } from "@nestjs/common";
import { CreateAuthenticationDto } from "./dto/create-authentication.dto";
import { UpdateAuthenticationDto } from "./dto/update-authentication.dto";
import { Redis } from "ioredis";

@Injectable()
export class AuthenticationService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

  async checkAuth(sessionID: string) {
    const sessionIdWithoutQuotes = sessionID.replace(/['"]+/g, "");
    console.log("sessionIdWithoutQuotes: ", sessionIdWithoutQuotes);

    /**
     * accessToken: string;
  refreshToken: string;
     */

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

    // Check if the access token has expired
    if (expirationTime > currentTimestamp) {
      //access token still valid
      return true;
    } else {
      currentTimestamp.setHours(currentTimestamp.getHours() + 1);
      this.redisClient.hset(
        sessionIdWithoutQuotes,
        "access_expires",
        accessExpiresISO
      );
      return true;
    }

    // console.log("token: ", token);

    // return token;

    // const exists = await this.redisClient.exists(sessionIdWithoutQuotes);

    // console.log("exists: ", exists === 1);
    // return exists === 1;
  }

  // async getDataRedis() {
  //   return await this.redisClient.
  // }

  async logoutUser(sessionID: string) {
    console.log("sessionID: ", sessionID);
    const sessionIDValue = Object.keys(sessionID)[0];

    const sessionIdWithoutQuotes = sessionIDValue.replace(/['"]+/g, "");
    // const sessionIdWithoutQuotes = Object.keys(sessionID)[0];
    console.log("sessionIdWithoutQuotes: ", sessionIdWithoutQuotes);

    const numberOfFieldsDeleted = await this.redisClient.del(
      sessionIdWithoutQuotes
    );

    //means that 1 or more fields got deleted
    return numberOfFieldsDeleted > 0;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
