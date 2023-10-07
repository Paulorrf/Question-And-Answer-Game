import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateSessionStoreDto } from "./dto/create-session-store.dto";
import { UpdateSessionStoreDto } from "./dto/update-session-store.dto";
import { v4 as uuidv4 } from "uuid";
import { Redis } from "ioredis";

@Injectable()
export class SessionStoresService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

  async create(createSessionStoreDto: CreateSessionStoreDto) {
    const uuid: string = uuidv4();

    await this.redisClient.hset(String(uuid), createSessionStoreDto);

    return uuid;
  }

  async getRedisData(key: string) {
    return await this.redisClient.hgetall(key);
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionStore`;
  }

  update(id: number, updateSessionStoreDto: UpdateSessionStoreDto) {
    return `This action updates a #${id} sessionStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionStore`;
  }
}
