import { Module } from "@nestjs/common";
import { SessionStoresService } from "./session-stores.service";
import { SessionStoresController } from "./session-stores.controller";
import { RedisModule } from "src/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [SessionStoresController],
  providers: [SessionStoresService],
})
export class SessionStoresModule {}
