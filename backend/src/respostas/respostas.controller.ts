import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RespostasService } from "./respostas.service";
import { AnswerRespostaDto } from "./dto/answer-resposta.dto";
import { UpdateRespostaDto } from "./dto/update-resposta.dto";

@Controller("respostas")
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @Post("answer")
  answer(@Body() answerRespostaDto: AnswerRespostaDto) {
    return this.respostasService.answer(answerRespostaDto);
  }

  @Get()
  findAll() {
    return this.respostasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.respostasService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRespostaDto: UpdateRespostaDto
  ) {
    return this.respostasService.update(+id, updateRespostaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.respostasService.remove(+id);
  }
}
