import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
  controllers: [],
  providers: [
    {
      provide: "REDIS_CLIENT", // Provide a token for the Redis client
      useValue: new Redis(process.env.REDIS_URL),
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
