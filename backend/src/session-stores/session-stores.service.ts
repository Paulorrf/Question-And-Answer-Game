import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateSessionStoreDto } from "./dto/create-session-store.dto";
import { UpdateSessionStoreDto } from "./dto/update-session-store.dto";
import { Redis } from "ioredis";

@Injectable()
export class SessionStoresService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

  create(createSessionStoreDto: CreateSessionStoreDto) {
    return this.redisClient.set("user-ID", "session-data");
  }

  findAll() {
    return `This action returns all sessionStores`;
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
