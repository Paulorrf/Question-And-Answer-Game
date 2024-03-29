import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
// import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    // console.log("validate");
    // if (user && user.password === pass) {
    if (user) {
      const { ...result } = user;
      return result;
    }
    return {
      message: "nao achou o user",
    };
    // return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.getTokens(user.id, user.email);
    const refreshTk = await this.updateRefreshToken(
      user.id,
      tokens.refreshToken
    );
    // return {
    //   access_token: tokens.accessToken
    // };
    return tokens.accessToken;
  }

  async updateRefreshToken(userId: any, refreshToken: string) {
    // const hashedRefreshToken = await this.hashData(refreshToken);
    // await this.usersService.update(userId, {
    //   refreshToken: hashedRefreshToken,
    // });

    try {
      // const updatedUser = await this.prisma.user_data.update({
      //   where: {
      //     id: Number(userId),
      //   },
      //   data: {
      //     // refresh_token: refreshToken,
      //   },
      // });
      // return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async checkAuth(sessionID: any) {
    console.log("sessionID");
    console.log(sessionID);
    console.log("sessionID");
    return true;
  }

  async getTokens(userId: string, email: string) {
    const userStatus = await this.prisma.user_data.findFirst({
      where: {
        email,
      },
      select: {
        name: true,
        character: {
          select: {
            status: {
              select: {
                agility: true,
                intelligence: true,
                luck: true,
                strength: true,
              },
            },
          },
        },
      },
    });
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          status: userStatus.character.status,
          name: userStatus.name,
        },
        {
          secret: "segredo",
          expiresIn: "7d",
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: "segredo",
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
