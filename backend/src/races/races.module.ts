import { Module } from "@nestjs/common";
import { RacesService } from "./races.service";
import { RacesController } from "./races.controller";
import { RedisModule } from "src/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
