import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SessionStoresService } from "./session-stores.service";
import { CreateSessionStoreDto } from "./dto/create-session-store.dto";
import { UpdateSessionStoreDto } from "./dto/update-session-store.dto";

@Controller("session-stores")
export class SessionStoresController {
  constructor(private readonly sessionStoresService: SessionStoresService) {}

  @Post()
  create(@Body() createSessionStoreDto: CreateSessionStoreDto) {
    return this.sessionStoresService.create(createSessionStoreDto);
  }

  @Get("get-redis-data/:key")
  getRedisData(@Param("key") key: string) {
    console.log(key);
    return this.sessionStoresService.getRedisData(key);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sessionStoresService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSessionStoreDto: UpdateSessionStoreDto
  ) {
    return this.sessionStoresService.update(+id, updateSessionStoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sessionStoresService.remove(+id);
  }
}
