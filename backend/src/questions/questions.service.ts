import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { PrismaService } from "src/prisma/prisma.service";

interface CreateProps {
  body: string;
  situation: "active" | "inactive" | "deleted";
  description_right_answer: string;
  user_data_id: number;
}

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      //create a new set for all the questions
      const new_question_set = await this.prisma.question_set.create({
        data: {
          description: createQuestionDto.question_set.description,
          title: createQuestionDto.question_set.title,
          difficulty: createQuestionDto.question_set.difficulty,
          situation: createQuestionDto.question_set.situation,
        },
      });

      //create an array of questions + set_id
      const allQuestions = createQuestionDto.questions.map(
        (question_subj: CreateProps) => {
          return {
            body: question_subj.body,
            situation: question_subj.situation,
            description_right_answer: question_subj.description_right_answer,
            user_data_id: question_subj.user_data_id,
            question_set_id: new_question_set.id,
          };
        }
      );

      //array of ids
      const createQuestions = await this.prisma.$transaction(
        allQuestions.map((question) =>
          this.prisma.question.create({ data: question })
        )
      );

      let answersArr = [];

      for (let i = 0; i < createQuestions.length; i++) {
        for (
          let x = 0;
          x < createQuestionDto.questions[i].answers.length;
          x++
        ) {
          answersArr.push({
            body: createQuestionDto.questions[i].answers[x].body,
            is_correct: createQuestionDto.questions[i].answers[x].is_correct,
            question_id: createQuestions[i].id,
          });
        }
      }

      //save answer to each specific question
      const createsQuestions2 = await this.prisma.answer.createMany({
        data: answersArr,
      });

      const upsertedNames = await this.prisma.$transaction(
        createQuestionDto.tags_spec.map((name) =>
          this.prisma.tag.upsert({
            where: {
              name: name,
            },
            create: {
              name: name,
            },
            update: {},
            select: {
              id: true,
            },
          })
        )
      );

      const toUpper = function (x: string) {
        return x.toUpperCase();
      };

      const tag_primary_upper = createQuestionDto.tags_primary.map(toUpper);

      const portalsId = await this.prisma.portal.findMany({
        where: {
          name: {
            in: tag_primary_upper,
          },
        },
        select: {
          id: true,
        },
      });

      // const newPortalsId = portalsId.map(value => value)

      /**
       * precisa testar se vai criar varias tags_spec com
       * o id dos portais primarios, testar com dois portais primarios
       */
      // const upsertedPortals = await this.prisma.$transaction(
      //   createQuestionDto.tags_spec.map((name) =>
      //     this.prisma.portal_spec.upsert({
      //       where: {
      //         name: name,
      //       },

      //       create: {
      //         name: name,
      //         portal_id: Number(
      //           portalsId.map((portal: { id: number }) => portal.id)
      //         ),
      //       },
      //       update: {},
      //       select: {
      //         id: true,
      //       },
      //     })
      //   )
      // );

      const newValues: Array<{
        portal_spec_id: number;
        portal_id: number;
      }> = [];

      for (let i = 0; i < upsertedNames.length; i++) {
        for (let x = 0; x < portalsId.length; x++) {
          newValues.push({
            portal_spec_id: upsertedNames[i].id,
            portal_id: portalsId[x].id,
          });
        }
      }

      // const upsertedPortals = await this.prisma.portal_spec.createMany({
      //   data: newValues,
      //   skipDuplicates: true,
      // });

      const upsertedPortals2 = await this.prisma.portal_spec_primary.createMany(
        {
          data: newValues,
          skipDuplicates: true,
        }
      );

      console.log("11111111");
      console.log(newValues);
      console.log("11111111");

      // for (let i = 0; i < upsertedPortals.length; i++) {
      //   for (let x = 0; x < portalsId.length; x++) {
      //     newValues.push({
      //       tag_id: upsertedPortals[i].id,
      //       portal_spec_id: portalsId[x].id,
      //     });
      //   }
      // }

      // const createddd = await this.prisma.$transaction(
      //   newValues.map((name: any) =>
      //     this.prisma.portal_spec_tag.upsert({
      //       where: {
      //         portal_spec_id_tag_id: {
      //           portal_spec_id: name.portal_spec_id,
      //           tag_id: name.tag_id,
      //         },
      //       },
      //       create: {
      //         portal_spec_id: name.portal_spec_id,
      //         tag_id: name.tag_id,
      //       },
      //       update: {},
      //     })
      //   )
      // );

      // console.log("222222");
      // console.log(portalsId);
      // console.log("2222222");

      // console.log("33333333");
      // console.log(newValues);
      // console.log("3333333");

      //liga a tag biologia aos portais, zoologia, bioquimica e etc
      // const tag_spec = await this.prisma.portal_spec_tag.createMany({
      //   data: newValues,
      // });

      const allSetQuestionsTags = upsertedNames.map((tagId: { id: number }) => {
        return {
          tag_id: tagId.id,
          question_set_id: new_question_set.id,
        };
      });

      const tags_question = await this.prisma.question_set_tag.createMany({
        data: allSetQuestionsTags,
      });

      //
      return "pergunta criada com sucesso";
    } catch (error) {
      console.log(error);
      return "erro ao criar questão";
    }
  }

  findAll() {
    return `This action returns all questions`;
  }

  async findOneSetQuestion(id: number) {
    try {
      const questionSet = await this.prisma.question_set.findFirst({
        where: {
          id,
        },
      });
      return questionSet;
    } catch (error) {
      console.log(error);
      return "erro ao achar set de questões";
    }
  }

  async findOneQuestion(id: number) {
    try {
      const question = await this.prisma.question.findFirst({
        where: {
          id,
        },
      });

      return question;
    } catch (error) {
      console.log(error);
      return "erro ao achar set de questões";
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const updatedQuestion = await this.prisma.question.update({
        where: {
          id,
        },
        data: {
          body: updateQuestionDto.body || undefined,
          situation: updateQuestionDto.situation || undefined,
          description_right_answer:
            updateQuestionDto.description_right_answer || undefined,
          user_data_id: updateQuestionDto.user_data_id || undefined,
        },
      });
      return updatedQuestion;
    } catch (error) {
      console.log(error);
      return "erro ao atualizar questão";
    }
  }

  async remove(id: number) {
    await this.prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
