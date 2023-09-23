import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
  controllers: [],
  providers: [
    {
      provide: "REDIS_CLIENT", // Provide a token for the Redis client
      useValue: new Redis({
        host: "localhost",
        port: 6379,
      }),
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
