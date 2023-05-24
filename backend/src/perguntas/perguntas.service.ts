import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePerguntaDto } from "./dto/create-pergunta.dto";
import { UpdatePerguntaDto } from "./dto/update-pergunta.dto";

@Injectable()
export class PerguntasService {
  constructor(private prisma: PrismaService) {}

  async create(createPerguntaDto: CreatePerguntaDto) {
    console.log("question body front");
    console.log(createPerguntaDto);
    console.log("question body front");
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
        console.log("question");
        console.log(question);
        const saved2 = await this.prisma.question.create({
          data: {
            //faz com que as perguntas pertençam ao novo set
            question_set_id: Number(newSetOfQuestions.id),
            difficulty: question.difficulty,
            body: question.question,
            answer: {
              create: [
                {
                  body: question.answer1,
                  is_correct: question.answer === 1,
                  // description: question.answer[0].description,
                },
                {
                  body: question.answer2,
                  is_correct: question.answer === 2,
                  //@ts-ignore
                  // description: question.answer[1].description,
                },
                {
                  body: question.answer3,
                  is_correct: question.answer === 3,
                  //@ts-ignore
                  // description: question.answer[2].description,
                },
                {
                  body: question.answer4,
                  is_correct: question.answer === 4,
                  //@ts-ignore
                  // description: question.answer[3].description,
                },
              ],
            },
            question_tags: {
              create: [
                {
                  tags_id: 1,
                },
                {
                  tags_id: 2,
                },
                {
                  tags_id: 3,
                },
                {
                  tags_id: 4,
                },
              ],
            },
            //colocar no futuro
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

  async getAll(start: number) {
    try {
      const questions = await this.prisma.question.findMany({
        skip: 0,
      });

      return questions;
    } catch (error) {
      return "erro get all";
    }
  }

  async findSome(start: number) {
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
      console.log("id");
      console.log(id);
      console.log("id");
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
      return undefined;
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
