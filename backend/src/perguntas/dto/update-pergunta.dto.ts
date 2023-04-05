import { PartialType } from "@nestjs/mapped-types";
import { CreatePerguntaDto } from "./create-pergunta.dto";

export class UpdatePerguntaDto extends PartialType(CreatePerguntaDto) {
  theme: string;
  body: string;
  level: "easy" | "normal" | "hard" | "very_hard" | "expert";
}
