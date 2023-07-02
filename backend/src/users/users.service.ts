import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import * as bcrypt from "bcrypt";
import { UpdateStatusDto } from "./dto/update-status-dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly salt = 10;
  //

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    let idRace: number;
    if (createUserDto.race === "orc") {
      idRace = 1;
    } else if (createUserDto.race === "humano") {
      idRace = 3;
    } else {
      idRace = 2;
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

  async getStatus(id: number) {
    try {
      const status = await this.prisma.user_data.findFirst({
        where: {
          id,
        },
        select: {
          character: {
            select: {
              status: true,
            },
          },
        },
      });

      return status;
    } catch (error) {
      console.log(error);
      console.log("error");
      return null;
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    console.log("status recebidos");
    console.log(updateStatusDto);
    console.log("status recebidos");

    try {
      const updatedStatus = await this.prisma.user_data.update({
        where: {
          email: updateStatusDto.email,
        },
        data: {
          status_point_remain: updateStatusDto.remainingPoints,
          character: {
            update: {
              status: {
                update: {
                  agility: updateStatusDto.agility,
                  intelligence: updateStatusDto.intelligence,
                  luck: updateStatusDto.luck,
                  strength: updateStatusDto.strength,
                },
              },
            },
          },
        },
        select: {
          status_point_remain: true,
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

      console.log(updatedStatus);

      return updatedStatus;
    } catch (error) {
      console.log("deu ruim no update dos status");
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

  async findOneById(id: number) {
    try {
      const foundUser = await this.prisma.user_data.findFirst({
        where: {
          id,
        },
        select: {
          experience: true,
          email: true,
          name: true,
          nivel: true,
          status_point_remain: true,
          character: {
            include: {
              classes: {
                select: {
                  nome: true,
                },
              },
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

      return foundUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
