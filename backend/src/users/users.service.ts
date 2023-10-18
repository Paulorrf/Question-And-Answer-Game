import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateStatusDto } from "./dto/update-status-dto";
import { LostStatus } from "./dto/lostStatus-user-dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    //check if user exist
    const user = await this.prisma.user_data.findUnique({
      where: {
        email: createUserDto.email,
      },
      select: {
        id: true,
        nivel: true,
      },
    });

    if (user) {
      return user;
    }

    // //races are created manually in the db
    // let idRace: number;
    // //status are created manually in the db for each race
    // let idStatus: number;

    // if (createUserDto.race === "orc") {
    //   idRace = 1;
    //   idStatus = 2;
    // } else if (createUserDto.race === "humano") {
    //   idRace = 3;
    //   idStatus = 3;
    // } else {
    //   idRace = 2;
    //   idStatus = 4;
    // }

    try {
      //character is created in the races.service.ts
      const savedUser = await this.prisma.user_data.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          display_name: createUserDto.name,
          token: {
            create: {
              // access_tk: createUserDto.access_tk ?? "",
              refresh_tk: createUserDto.refresh_tk ?? "",
            },
          },
          // character: {
          // create: {
          //   classes: {
          //     connect: {
          //       id: idRace,
          //     },
          //   },
          //   status: {
          //     connect: {
          //       id: idStatus,
          //     },
          //   },
          // },
          // },
        },
      });

      return savedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getStatus(id: number) {
    console.log("id");
    console.log(id);
    console.log("id");
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

  async lostStatusBasedOnWrongAnswers(lostStatus: LostStatus) {
    interface Status {
      agility: number;
      intelligence: number;
      luck: number;
      strength: number;
    }

    function reduceStatusPoints(amount: number, currentStatus: Status): Status {
      const possibleStatus = ["agility", "luck", "strength", "intelligence"];

      const updatedStatus: Status = { ...currentStatus };

      console.log("currentStatus");
      console.log(currentStatus);

      for (let i = 0; i < amount; i++) {
        const arrPos = Math.floor(Math.random() * 4);
        updatedStatus[possibleStatus[arrPos]] -= 1;
      }

      return updatedStatus;
    }

    // Helper function to shuffle an array using the Fisher-Yates algorithm
    function shuffleArray<T>(array: T[]): T[] {
      const newArray = [...array];

      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      return newArray;
    }
    try {
      // Query the user's data including the character status
      const lostStatusWithCharacter = await this.prisma.user_data.findFirst({
        where: {
          id: lostStatus.userId,
        },
        include: {
          character: {
            select: {
              status: true,
            },
          },
        },
      });

      console.log("lostStatusWithCharacter");
      console.log(lostStatusWithCharacter);

      // Get the character status from the queried data
      const characterStatus = lostStatusWithCharacter?.character?.status;

      if (!characterStatus) {
        // Handle the case when character status is not found
        throw new Error("Character status not found");
      }

      // Reduce the status points
      const reducedStatus = reduceStatusPoints(
        lostStatus.quantityWrongAnswers,
        characterStatus
      );

      console.log("reducedStatus");
      console.log(reducedStatus);

      // Update the user's character status
      const lostStatusReturned = await this.prisma.user_data.update({
        where: {
          id: lostStatus.userId,
        },
        data: {
          character: {
            update: {
              status: {
                update: {
                  agility: reducedStatus.agility,
                  strength: reducedStatus.strength,
                  intelligence: reducedStatus.intelligence,
                  luck: reducedStatus.luck,
                },
              },
            },
          },
        },
      });

      // Continue with the rest of your code
    } catch (error) {
      // Handle the error
      console.error(error);
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
