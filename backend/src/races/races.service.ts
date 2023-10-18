import { Inject, Injectable } from "@nestjs/common";
import { CreateRaceDto } from "./dto/create-race.dto";
import { UpdateRaceDto } from "./dto/update-race.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Redis } from "ioredis";

@Injectable()
export class RacesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject("REDIS_CLIENT") private readonly redisClient: Redis
  ) {}

  create(createRaceDto: CreateRaceDto) {
    return "This action adds a new race";
  }

  async appendRace(updateRaceDto: UpdateRaceDto): Promise<boolean> {
    try {
      const userID = Number(
        await this.redisClient.hget(updateRaceDto.data.sessionId, "id")
      );

      const userHasCharacter = await this.prisma.user_data.findFirst({
        where: {
          id: userID,
        },
        select: {
          character_id: true,
        },
      });

      const relatedClass = await this.prisma.classes.findUnique({
        where: {
          id: Number(updateRaceDto.data.classeId),
        },
        select: {
          status: {
            select: {
              id: true,
              agility: true,
              intelligence: true,
              luck: true,
              strength: true,
            },
          },
        },
      });

      if (!userHasCharacter.character_id) {
        if (relatedClass && relatedClass.status !== null) {
          const statusId = await this.prisma.status.create({
            data: {
              agility: relatedClass.status.agility,
              intelligence: relatedClass.status.intelligence,
              luck: relatedClass.status.luck,
              strength: relatedClass.status.strength,
            },
            select: {
              id: true,
            },
          });

          await this.prisma.user_data.update({
            where: {
              id: userID,
            },
            data: {
              character: {
                create: {
                  classe_id: Number(updateRaceDto.data.classeId),
                  status_id: statusId.id,
                },
              },
            },
          });

          return true;
        }
      }

      return false; // Character was not created
    } catch (error) {
      // Handle errors and return false in case of an error
      console.error("Error in appendRace:", error);
      return false;
    }
  }

  async findAll() {
    return this.prisma.classes.findMany({
      include: {
        status: true,
      },
    });
  }

  async findOne(id: string) {
    const userID = Number(await this.redisClient.hget(id, "id"));

    const hasCharacter = await this.prisma.user_data.findUnique({
      where: {
        id: userID,
      },
      select: {
        character_id: true,
      },
    });

    if (hasCharacter.character_id) {
      return true;
    }
    return false;
  }

  update(id: number, updateRaceDto: UpdateRaceDto) {
    return `This action updates a #${id} race`;
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
