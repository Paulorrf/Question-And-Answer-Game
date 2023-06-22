import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { PrismaService } from "src/prisma/prisma.service";

interface CreateProps {
  body: string;
  // situation: "active" | "inactive" | "deleted";
  description_right_answer: string;
  user_id: number;
}

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      console.log("questionnnn");
      console.log(createQuestionDto.data);
      console.log("questionnnn");
      //create a new set for all the questions
      const new_question_set = await this.prisma.question_set.create({
        data: {
          description: createQuestionDto.data.question_set.description,
          title: createQuestionDto.data.question_set.title,
          difficulty: createQuestionDto.data.question_set.difficulty,
          situation: "active",
        },
        // data: {
        //   description: createQuestionDto.question_set.description || "",
        //   title: createQuestionDto.question_set.title || "",
        //   difficulty: createQuestionDto.question_set.difficulty || "easy",
        //   situation: createQuestionDto.question_set.situation,
        // },
      });

      //create an array of questions + set_id
      const allQuestions = createQuestionDto.data.questions.map(
        (question_subj: any) => {
          return {
            body: question_subj.body,
            // situation: question_subj.situation,
            description_right_answer: question_subj.description_right_answer,
            user_data_id: question_subj.user_id,
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
          x < createQuestionDto.data.questions[i].answers.length;
          x++
        ) {
          answersArr.push({
            body: createQuestionDto.data.questions[i].answers[x].body,
            is_correct:
              createQuestionDto.data.questions[i].answers[x].is_correct,
            question_id: createQuestions[i].id,
          });
        }
      }

      //save answer to each specific question
      const createsQuestions2 = await this.prisma.answer.createMany({
        data: answersArr,
      });

      const upsertedNames = await this.prisma.$transaction(
        createQuestionDto.data.tags_spec.map((name) =>
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

      const tag_primary_upper =
        createQuestionDto.data.tags_primary.map(toUpper);

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
      const upsertedPortals = await this.prisma.$transaction(
        createQuestionDto.data.tags_spec.map((name) =>
          this.prisma.portal_spec.upsert({
            where: {
              name: name,
            },

            create: {
              name: name,
              portal_id: Number(
                portalsId.map((portal: { id: number }) => portal.id)
              ),
            },
            update: {},
            select: {
              id: true,
            },
          })
        )
      );

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

      const upsertedPortals2 = await this.prisma.$transaction(
        async (prisma) => {
          for (const portalValues of newValues) {
            const { portal_id, portal_spec_id } = portalValues;
            const idValue = Number(
              String(portal_spec_id).concat(String(portal_id))
            );

            await prisma.portal_spec_primary.upsert({
              where: {
                comp_key: idValue,
              },
              create: { comp_key: idValue, portal_id, portal_spec_id },
              update: {},
            });
          }
        }
      );

      // console.log("11111111");
      // console.log(upsertedPortals2);
      // console.log("11111111");

      const allSetQuestionsTags = upsertedNames.map((tagId: { id: number }) => {
        return {
          tag_id: tagId.id,
          question_set_id: new_question_set.id,
        };
      });

      const tags_question = await this.prisma.question_set_tag.createMany({
        data: allSetQuestionsTags,
      });

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
