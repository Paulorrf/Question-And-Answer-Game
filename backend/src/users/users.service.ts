import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import * as bcrypt from "bcrypt";
import { UpdateStatusDto } from "./dto/update-status-dto";
import { LostStatus } from "./dto/lostStatus-user-dto";

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

  async lostStatusBasedOnWrongAnswers(lostStatus: LostStatus) {
    interface Status {
      agility: number;
      intelligence: number;
      luck: number;
      strength: number;
    }

    // function reduceStatusPoints(amount: number, currentStatus: Status): Status {
    //   const remainingPoints = amount;

    //   const statusKeys = Object.keys(currentStatus) as Array<keyof Status>;

    //   // Shuffle the status keys randomly
    //   const shuffledKeys = shuffleArray(statusKeys);

    //   const updatedStatus: Status = {
    //     agility: currentStatus.agility,
    //     intelligence: currentStatus.intelligence,
    //     luck: currentStatus.luck,
    //     strength: currentStatus.strength,
    //   };

    //   let pointsLeft = remainingPoints;

    //   for (const key of shuffledKeys) {
    //     // Check if there are still points left to reduce
    //     if (pointsLeft === 0) {
    //       break;
    //     }

    //     // Generate a random reduction value between 0 and the remaining points
    //     const maxReduction = Math.min(pointsLeft, updatedStatus[key]);
    //     const reduction = Math.floor(Math.random() * (maxReduction + 1));

    //     // Reduce the status by the random reduction value
    //     updatedStatus[key] -= reduction;

    //     // Update the remaining points
    //     pointsLeft -= reduction;
    //   }

    //   return updatedStatus;
    // }

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
