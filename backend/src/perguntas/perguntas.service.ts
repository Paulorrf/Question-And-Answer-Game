import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePerguntaDto } from "./dto/create-pergunta.dto";
import { UpdatePerguntaDto } from "./dto/update-pergunta.dto";

@Injectable()
export class PerguntasService {
  constructor(private prisma: PrismaService) {}

  async create(createPerguntaDto: CreatePerguntaDto) {
    console.log(createPerguntaDto);
    try {
      // //Verifica se pelo menos uma das perguntas está como correta
      // const result = createPerguntaDto.answer.filter((item) => item.is_correct);

      // //se nenhuma ou mais de uma resposta estiver como correta
      // if (result.length !== 1) {
      //   return "Selecione uma resposta como correta";
      // }

      // //Caso venha 5 respostas ou mais
      // if (createPerguntaDto.answer.length > 4) {
      //   return "Coloque somente 4 respostas";
      // }

      // if (createPerguntaDto.answer.length < 4) {
      //   return "Coloque pelo menos 4 respostas";
      // }

      //cria um novo set de questões
      const newSetOfQuestions = await this.prisma.question_set.create({
        data: {},
      });

      console.log("new question");
      console.log(newSetOfQuestions);

      const teste = createPerguntaDto.data.map(async (question: any) => {
        const saved2 = await this.prisma.question.create({
          data: {
            //faz com que as perguntas pertençam ao novo set
            question_set_id: Number(newSetOfQuestions.id),
            difficulty: question.level,
            body: question.body,
            answer: {
              create: [
                {
                  body: question.answer[0].body,
                  is_correct: question.answer[0].is_correct,
                  description: question.answer[0].description,
                },
                {
                  //@ts-ignore
                  body: question.answer[1].body,
                  //@ts-ignore
                  is_correct: question.answer[1].is_correct,
                  //@ts-ignore
                  description: question.answer[1].description,
                },
                {
                  //@ts-ignore
                  body: question.answer[2].body,
                  //@ts-ignore
                  is_correct: question.answer[2].is_correct,
                  //@ts-ignore
                  description: question.answer[2].description,
                },
                {
                  //@ts-ignore
                  body: question.answer[3].body,
                  //@ts-ignore
                  is_correct: question.answer[3].is_correct,
                  //@ts-ignore
                  description: question.answer[3].description,
                },
              ],
            },
            question_tags: {
              create: [
                {
                  tags_id: question.tags[0].id,
                },
                {
                  tags_id: question.tags[1].id,
                },
                {
                  tags_id: question.tags[2].id,
                },
                {
                  tags_id: question.tags[3].id,
                },
              ],
            },
            user_id: question.user_id,
          },
        });
      });

      return teste;
    } catch (error) {
      console.log("erro ao criar questao: ", error);
      return error;
    }
  }

  async findMany(start: number) {
    try {
      const tenQuestions = await this.prisma.question.findMany({
        skip: start === 10 ? 0 : start,
        take: start,
      });

      console.log("ten questions");
      console.log(tenQuestions);
      console.log("ten questions");

      return tenQuestions;
    } catch (error) {
      console.log("erro ten questions");
      return "erro on getting 10 questions";
    }
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
            select: {
              body: true,
              description: true,
              is_correct: true,
              id: true,
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
