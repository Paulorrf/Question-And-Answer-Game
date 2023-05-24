import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PerguntasService } from "./perguntas.service";
import { CreatePerguntaDto } from "./dto/create-pergunta.dto";
import { UpdatePerguntaDto } from "./dto/update-pergunta.dto";

@Controller("perguntas")
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post("create")
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get(":start")
  findMany(@Param("start") start: string) {
    return this.perguntasService.findSome(+start);
  }

  @Get("one/:id")
  findPergunta(@Param("id") id: string) {
    return this.perguntasService.findQuestion(+id);
  }

  @Get("all/:start")
  getAll(@Param("start") start: string) {
    return this.perguntasService.getAll(+start);
  }
  //
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePerguntaDto: UpdatePerguntaDto
  ) {
    return this.perguntasService.update(+id, updatePerguntaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.perguntasService.remove(+id);
  }
}
