import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePerguntaDto } from "./dto/create-pergunta.dto";
import { UpdatePerguntaDto } from "./dto/update-pergunta.dto";

@Injectable()
export class PerguntasService {
  constructor(private prisma: PrismaService) {}

  async create(createPerguntaDto: CreatePerguntaDto) {
    try {
      //Verifica se pelo menos uma das perguntas está como correta
      const result = createPerguntaDto.answer.filter((item) => item.is_correct);

      //se nenhuma ou mais de uma resposta estiver como correta
      if (result.length !== 1) {
        return "Selecione uma resposta como correta";
      }

      //Caso venha 5 respostas ou mais
      if (createPerguntaDto.answer.length > 4) {
        return "Coloque somente 4 respostas";
      }

      if (createPerguntaDto.answer.length < 4) {
        return "Coloque pelo menos 4 respostas";
      }

      const savedQuestion = await this.prisma.question.create({
        data: {
          difficulty: createPerguntaDto.level,
          body: createPerguntaDto.body,
          answer: {
            create: [
              {
                body: createPerguntaDto.answer[0].body,
              },
              {
                //@ts-ignore
                body: createPerguntaDto.answer[1].body,
              },
              {
                //@ts-ignore
                body: createPerguntaDto.answer[2].body,
              },
              {
                //@ts-ignore
                body: createPerguntaDto.answer[3].body,
              },
            ],
          },
          question_tags: {
            create: [
              {
                tags_id: createPerguntaDto.tags[0].id,
              },
              {
                tags_id: createPerguntaDto.tags[1].id,
              },
              {
                tags_id: createPerguntaDto.tags[2].id,
              },
              {
                tags_id: createPerguntaDto.tags[3].id,
              },
            ],
          },
          user_id: createPerguntaDto.user_id,
        },
      });

      return savedQuestion;
    } catch (error) {
      console.log("erro ao criar questao: ", error);
      return error;
    }
  }

  findAll() {
    return `This action returns all perguntas`;
  }

  async findQuestion(id: number) {
    try {
      const question = await this.prisma.question.findFirst({
        where: {
          id,
        },
        include: {
          answer: {
            where: {
              question_id: id,
            },
          },
          question_tags: {
            where: {
              question_id: id,
            },
          },
        },
      });

      return question;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, updatePerguntaDto: UpdatePerguntaDto) {
    try {
      const updatedQuestion = await this.prisma.question.update({
        where: {
          id,
        },
        data: {
          body: updatePerguntaDto.body,
          difficulty: updatePerguntaDto.level,
        },
      });

      return updatedQuestion;
    } catch (error) {
      console.log(error);
      return "não foi possível atualizar a questão";
    }
  }

  async remove(id: number) {
    try {
      const removedQuestion = await this.prisma.question.delete({
        where: {
          id,
        },
      });

      return removedQuestion;
    } catch (error) {
      console.log(error);
      return `não foi possível deletar a pergunta com o id ${id}`;
    }
  }
}
