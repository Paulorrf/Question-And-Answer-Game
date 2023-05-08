import { Injectable } from "@nestjs/common";
import { AnswerRespostaDto } from "./dto/answer-resposta.dto";
import { UpdateRespostaDto } from "./dto/update-resposta.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { answer, question } from "@prisma/client";

@Injectable()
export class RespostasService {
  constructor(private prisma: PrismaService) {}

  /**
   * id da pergunta
   * id da resposta correta
   * id da resposta marcada
   */

  //Ganhar EXP ao responder corretamente
  async answer(answerRespostaDto: AnswerRespostaDto) {
    // console.log("respostas");
    // console.log(answerRespostaDto.respostas);
    // console.log("respostas");
    try {
      const question_arr = await this.prisma.question.findMany({
        where: {
          question_set_id: answerRespostaDto.id_questao,
        },
      });

      const values = await Promise.all(
        question_arr.map(async (question: question) => {
          return await this.prisma.answer.findMany({
            where: {
              question_id: question.id,
              is_correct: true,
            },
            select: {
              id: true,
              is_correct: true,
              question_id: true,
            },
          });
        })
      );

      //retorna um array, se resposta correta terá o id da resposta
      //se incorreta terá false
      return answerRespostaDto.respostas.map((answer) => {
        for (let i = 0; i < values.length; i++) {
          if (answer.id === values[i][0].id) {
            return values[i][0].question_id;
          }
        }
        return null;
      });

      // return "entrou resposta service";
    } catch (error) {
      console.log(error);
      return "erro ao retornar respostas";
    }
  }

  findAll() {
    return `This action returns all respostas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resposta`;
  }

  update(id: number, updateRespostaDto: UpdateRespostaDto) {
    return `This action updates a #${id} resposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} resposta`;
  }
}
