import { Injectable, Query } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AnswerQuestionDto } from "./dto/answer-question.dto";
import { ReportQuestion } from "./dto/report-question.dto";

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
      //create a new set for all the questions
      const new_question_set = await this.prisma.question_set.create({
        data: {
          description: createQuestionDto.data.question_set.description,
          title: createQuestionDto.data.question_set.title,
          difficulty: createQuestionDto.data.question_set.difficulty,
          situation: "active",
        },
      });

      //create an array of questions + set_id
      const allQuestions = createQuestionDto.data.questions.map(
        (question_subj) => {
          return {
            body: question_subj.body,
            situation: "active",
            description_right_answer: question_subj.description_right_answer,
            user_data_id: question_subj.user_id,
            question_set_id: new_question_set.id,
          };
        }
      );

      //array of ids
      const createQuestions = await this.prisma.$transaction(
        allQuestions.map((question) =>
          //@ts-ignore
          this.prisma.question.create({ data: question })
        )
      );

      //updates the set with the number of created questions
      //ex. 5, 10, 15, 20
      await this.prisma.question_set.update({
        where: {
          id: new_question_set.id,
        },
        data: {
          question_number: createQuestions.length,
        },
      });

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

      const newPortalsId = portalsId.map((value) => value.id);

      /**
       * precisa testar se vai criar varias tags_spec com
       * o id dos portais primarios, testar com dois portais primarios
       */

      for (let i = 0; i < newPortalsId.length; i++) {
        let values = createQuestionDto.data.tags_spec.map(
          async (name) =>
            await this.prisma.portal_spec.upsert({
              where: {
                name: name,
              },
              create: {
                name: name,
                portal_id: newPortalsId[i],
              },
              update: {},
              select: {
                id: true,
              },
            })
        );
      }

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
          for (const { portal_id, portal_spec_id } of newValues) {
            await prisma.portal_relation.upsert({
              where: {
                portal_id_portal_spec_id: {
                  portal_id,
                  portal_spec_id,
                },
              },
              create: {
                portal_id: portal_id,
                portal_spec_id: portal_spec_id,
              },
              update: {},
            });
          }
        }
      );

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

  async findQuestionsByUserEmail(userId: number) {
    try {
      const questions = await this.prisma.question_set.findMany({
        where: {
          question: {
            some: {
              user_data_id: userId,
            },
          },
        },
        select: {
          description: true,
          title: true,
          id: true,
          question: {
            select: {
              body: true,
              description_right_answer: true,
              situation: true,
              id: true,
              answer: {
                select: {
                  body: true,
                  is_correct: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      return questions;
    } catch (error) {
      console.log(error);
      console.log("deu ruim ao achar questions by email");
      return null;
    }
  }

  async questionsPagination(
    @Query("page") page: number,
    @Query("size") size: number,
    @Query("userId") userId: number
  ) {
    const skip = (page - 1) * size;

    try {
      const questions = await this.prisma.question_set.findMany({
        where: {
          question: {
            some: {
              user_data_id: Number(userId),
            },
          },
        },
        skip,
        take: Number(size),

        select: {
          description: true,
          question: {
            select: {
              body: true,
              situation: true,
              answer: true,
            },
          },
        },
      });
      return questions;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async questionSetNumber(@Query("userId") userId: number) {
    try {
      const distinctQuestionSetCount = await this.prisma
        .$queryRaw<number>`SELECT COUNT(DISTINCT question_set_id) FROM question WHERE user_data_id = ${userId}::integer`;

      const count = Number(distinctQuestionSetCount[0].count);

      return count;
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  }

  async ReportQuestion(reportValues: ReportQuestion) {
    try {
      const report_ids = await this.prisma.report_reasons.findMany({
        where: {
          reason: {
            in: reportValues.report_reasons,
          },
        },
        select: {
          id: true,
        },
      });

      const report_ids_only = report_ids.map((report) => report.id);

      const createdReports = await this.prisma.$transaction(
        report_ids_only.map((report_id) =>
          this.prisma.question_set_report.create({
            data: {
              question_set_id: reportValues.question_set_id,
              report_reasons_id: report_id,
              user_data_id: reportValues.userId,
            },
          })
        )
      );

      const countedReports = await this.prisma.$queryRaw`
        SELECT COUNT(DISTINCT user_data_id) AS count_of_different_reports
        FROM question_set_report where question_set_id = ${createdReports[0].question_set_id};
      `;

      const numberOfReports = Number(
        countedReports[0].count_of_different_reports
          .toString()
          .replace(/\D/g, "")
      );

      if (numberOfReports >= 3) {
        console.log("truuue");
        const transaction = await this.prisma.$transaction([
          // Update questions with the specified question_set_id to have "inactive" situation
          this.prisma.question.updateMany({
            where: {
              question_set_id: Number(createdReports[0].question_set_id),
            },
            data: {
              situation: "inactive",
            },
          }),

          // Update the corresponding question_set to have "inactive" situation
          this.prisma.question_set.update({
            where: {
              id: Number(createdReports[0].question_set_id),
            },
            data: {
              situation: "inactive",
            },
          }),
        ]);
      }

      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findTenQuestions(tags: any) {
    try {
      let arr = [];
      if (tags.tags instanceof Array) {
        arr = [...tags.tags];
      } else {
        arr.push(tags.tags);
      }
      const tags_ids = await this.prisma.tag.findMany({
        where: {
          name: {
            in: arr,
          },
        },
      });

      //getting only the ids
      let new_tags_ids = tags_ids.map((tag) => tag.id);

      const ten_questions_ids = await this.prisma.question_set_tag.findMany({
        where: {
          tag_id: {
            in: new_tags_ids,
          },
        },
        take: 10,
      });

      let set_tag_ids = ten_questions_ids.map(
        (question) => question.question_set_id
      );

      const ten_questions = await this.prisma.question_set.findMany({
        where: {
          id: {
            in: set_tag_ids,
          },
        },
        include: {
          question: {
            select: {
              user_data: {
                select: {
                  display_name: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      return ten_questions;
    } catch (error) {
      console.log(error);
      return "deu ruim ao procurar as 10 questoes";
    }
  }

  async findQuestions(id: number) {
    try {
      const questions = await this.prisma.question.findMany({
        where: {
          question_set_id: id,
        },
        include: {
          question_set: {
            select: {
              difficulty: true,
            },
          },
        },
      });

      const questions_ids = questions.map((question) => question.id);

      const answers = await this.prisma.answer.findMany({
        where: {
          question_id: {
            in: questions_ids,
          },
        },
      });

      for (let i = 0; i < questions.length; i++) {
        //@ts-ignore
        questions[i].answers = [];
      }

      for (let i = 0; i < answers.length; i++) {
        for (let x = 0; x < questions.length; x++) {
          if (answers[i].question_id === questions[x].id) {
            //@ts-ignore
            questions[x].answers.push(answers[i]);
          }
        }
      }

      return questions;
    } catch (error) {
      console.log(error);
      return "deu ruim ao achar as questoes";
    }
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

  async findRightAnswers(answers: AnswerQuestionDto) {
    try {
      //getting the user questions ids
      const questionIds = answers.chosenAnswers.map((question) => {
        return question.questionId;
      });

      //getting the user answers ids
      const answerIds = answers.chosenAnswers.map((answer) => {
        return answer.answerId;
      });

      //getting the question set information
      //answers[0].questionId
      const set_data = await this.prisma.question.findFirst({
        where: {
          id: answers.chosenAnswers[0].questionId,
        },
        select: {
          question_set_id: true,
          question_set: {
            select: {
              difficulty: true,
            },
          },
        },
      });

      //save the question set as answered for said user
      const saveAnsweredSet =
        await this.prisma.history_answered_set_question.create({
          data: {
            user_data_id: answers.userId,
            question_set_id: set_data.question_set_id,
          },
        });

      //get the correct answers id
      const answersReturned = await this.prisma.answer.findMany({
        where: {
          question_id: {
            in: questionIds,
          },
          is_correct: true,
        },
      });

      //filter for the correct user answers
      const result = answersReturned.filter(
        (answer, index) => answer.id === answerIds[index]
      );

      //get the user info for the level up related stuff
      const userData = await this.prisma.user_data.findUnique({
        where: {
          id: answers.userId,
        },
        select: {
          nivel: true,
          experience: true,
          status_point_remain: true,
        },
      });

      //how much exp each right answered question gives
      const easy = 100;
      const normal = 150;
      const hard = 200;
      const very_hard = 250;

      /**
       * calculate how many levels up the user got
       * and the amount of left exp for the next level
       * as well as the amount needed to go to the next level
       */
      function calculateLevel(
        experiencePoints: number,
        experienceThreshold: number,
        currentLevel: number
      ) {
        const level =
          currentLevel + Math.floor(experiencePoints / experienceThreshold);
        const remainingExperience = experiencePoints % experienceThreshold;
        const experienceTowardsNextLevel = 0;

        return {
          level: level,
          remainingExperience: remainingExperience,
          experienceTowardsNextLevel: experienceTowardsNextLevel,
        };
      }

      // increase the threshold by 50 for each level
      function calculateExperienceThreshold(level: number) {
        return 100 + (level - 1) * 50;
      }

      const experienceThreshold = calculateExperienceThreshold(userData.nivel);
      let totalExp = 0;

      switch (set_data.question_set.difficulty) {
        case "easy":
          totalExp = result.length * easy;
          break;
        case "normal":
          totalExp = result.length * normal;
          break;
        case "hard":
          totalExp = result.length * hard;
          break;
        case "very_hard":
          totalExp = result.length * very_hard;
          break;
        default:
          totalExp = 0;
      }

      //the current exp plus the amount gained from answering right
      const newExperience = userData.experience + totalExp;

      //after the calculation with the gained exp, how much it leveled up
      const currentLevel = calculateLevel(
        newExperience,
        experienceThreshold,
        userData.nivel
      );

      let updatedUser = {};
      let hasLevelUp = false;

      if (newExperience >= experienceThreshold) {
        const remainingExperience = newExperience - experienceThreshold;
        const nextLevelThreshold = calculateExperienceThreshold(
          currentLevel.level + 1
        );

        if (remainingExperience >= nextLevelThreshold) {
          console.log("entrou1");
          const nextLevel = calculateLevel(
            remainingExperience,
            nextLevelThreshold,
            currentLevel.level + 1
          );

          updatedUser = await this.prisma.user_data.update({
            where: {
              id: answers.userId,
            },
            data: {
              nivel: nextLevel.level,
              experience: remainingExperience,
              status_point_remain: userData.status_point_remain + 5,
            },
          });

          hasLevelUp = true;
        } else {
          updatedUser = await this.prisma.user_data.update({
            where: {
              id: answers.userId,
            },
            data: {
              nivel: currentLevel.level,
              experience: currentLevel.remainingExperience,
              status_point_remain: userData.status_point_remain + 5,
            },
          });

          hasLevelUp = true;
        }
      } else {
        updatedUser = await this.prisma.user_data.update({
          where: {
            id: answers.userId,
          },
          data: {
            nivel: currentLevel.level,
            experience: newExperience,
          },
        });
      }
      return {
        result,
        hasLevelUp,
      };
    } catch (error) {
      console.log(error);
      return "deu ruim em findRightAnswers";
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

  async updateRating(questionSetId: number, newRating: number) {
    const questionSet = await this.prisma.question_set.findFirst({
      where: { id: Number(questionSetId) },
      select: { id: true, rating: true },
    });

    if (!questionSet) {
      throw new Error("Question set not found");
    }

    const existingRating = questionSet.rating ?? 0; // Use 0 if rating is null

    // Calculate the updated rating by averaging the existing and new ratings
    const updatedRating = (existingRating + newRating) / 2;

    const updatedQuestionSet = await this.prisma.question_set.update({
      where: { id: Number(questionSetId) },
      data: { rating: updatedRating },
    });

    return updatedQuestionSet;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const updatedQuestion = await this.prisma.question.update({
        where: {
          id,
        },
        data: {
          body: updateQuestionDto.body || undefined,
          // situation: updateQuestionDto.situation || undefined,
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
