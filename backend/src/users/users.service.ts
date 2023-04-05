import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTagDto } from "./dto/create-user-dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly salt = 10;

  async create(createTagDto: any) {
    // console.log(createTagDto.body);
    try {
      const hashedPass = await bcrypt.hash(
        createTagDto.body.password,
        this.salt
      );
      const savedUser = await this.prisma.user_info.create({
        data: {
          email: createTagDto.body.email,
          password: hashedPass,
          name: createTagDto.body.name,
          character: {
            create: {
              dexterity: 1,
              intelligence: 1,
              luck: 1,
              strenght: 1,
              vitality: 1,
              level: 1,
            },
          },
        },
      });

      return savedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(email: string) {
    try {
      const foundUser = await this.prisma.user_info.findFirst({
        where: {
          email,
        },
      });

      return foundUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
