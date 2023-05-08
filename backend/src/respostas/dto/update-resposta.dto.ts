import { PartialType } from "@nestjs/mapped-types";
import { AnswerRespostaDto } from "./answer-resposta.dto";

export class UpdateRespostaDto extends PartialType(AnswerRespostaDto) {}
