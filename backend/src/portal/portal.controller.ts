import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PortalService } from "./portal.service";
import { CreatePortalDto } from "./dto/create-portal.dto";
import { UpdatePortalDto } from "./dto/update-portal.dto";

@Controller("portal")
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Post()
  create(@Body() createPortalDto: CreatePortalDto) {
    return this.portalService.create(createPortalDto);
  }

  @Get("specific/:name")
  findAllSpecific(@Param("name") name: string) {
    console.log("entrou");
    return this.portalService.findAllSpecific(name);
  }

  @Get("generic")
  findAllGeneric() {
    return this.portalService.findAllGeneric();
  }

  @Get("gletter/:word")
  findGenericByLetter(@Param("word") word: string) {
    return this.portalService.findGenericByLetter(word);
  }

  @Get("sletter/:word/:generic")
  findSpecificByLetter(
    @Param("word") word: any,
    @Param("generic") generic: string
  ) {
    console.log(word);
    console.log(generic);
    return this.portalService.findSpecificByLetter(word, generic);
  }

  @Get("requirement/:portal")
  getPortalStatusRequirement(@Param("portal") portal: string) {
    return this.portalService.getPortalStatusRequirement(portal);
  }

  @Post("requirements")
  availableDifficulties(
    @Body()
    status: any
  ) {
    return this.portalService.availableDifficulties(status);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePortalDto: UpdatePortalDto) {
    return this.portalService.update(+id, updatePortalDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.portalService.remove(+id);
  }
}
