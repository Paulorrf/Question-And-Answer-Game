import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly salt = 10;

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    let idRace: number;
    if (createUserDto.race === "orc") {
      idRace = 15;
    } else if (createUserDto.race === "humano") {
      idRace = 14;
    } else {
      idRace = 13;
    }

    //
    try {
      const hashedPass = await bcrypt.hash(createUserDto.password, this.salt);

      const savedUser = await this.prisma.user_data.create({
        data: {
          email: createUserDto.email,
          password: hashedPass,
          name: createUserDto.name,
          display_name: createUserDto.name,
          token: {
            create: {
              access_tk: "",
              referesh_tk: "",
            },
          },
          character: {
            // create: {
            //   classes: {
            //     create: {
            //       nome: createUserDto.race,
            //     },
            //   },
            create: {
              classes: {
                connect: {
                  id: idRace,
                },
              },

              status: {
                create: {
                  agility: createUserDto.status.agility,
                  intelligence: createUserDto.status.intelligence,
                  luck: createUserDto.status.luck,
                  strength: createUserDto.status.strength,
                },
              },
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
      const foundUser = await this.prisma.user_data.findFirst({
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
