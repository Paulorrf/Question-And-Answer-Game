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
//

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
            situation: "active",
            description_right_answer: question_subj.description_right_answer,
            user_data_id: question_subj.user_id,
            question_set_id: new_question_set.id,
          };
        }
      );

      console.log(`allQuestions`);
      console.log(allQuestions);
      console.log(`allQuestions`);

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

      console.log("answersArr");
      console.log(answersArr);
      console.log("answersArr");

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

      // const upsertedPortals2 = await this.prisma.$transaction(
      //   async (prisma) => {
      //     for (const portalValues of newValues) {
      //       const { portal_id, portal_spec_id } = portalValues;
      //       const idValue = Number(
      //         String(portal_spec_id).concat(String(portal_id))
      //       );

      //       await prisma.portal_spec_primary.upsert({
      //         where: {
      //           comp_key: idValue,
      //         },
      //         create: { comp_key: idValue, portal_id, portal_spec_id },
      //         update: {},
      //       });
      //     }
      //   }
      // );

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

      // const questions = await this.prisma.question.findMany({
      //   where: {
      //     user_data_id: userId,
      //   },
      //   select: {
      //     body: true,
      //     description_right_answer: true,
      //     situation: true,
      //     answer: {
      //       select: {
      //         body: true,
      //         is_correct: true,
      //       },
      //     },
      //     question_set: {
      //       select: {
      //         description: true,
      //         title: true,
      //         difficulty: true,
      //       },
      //     },
      //   },

      // });

      console.log(questions);
      return questions;
    } catch (error) {
      console.log(error);
      console.log("deu ruim ao achar questions by email");
      return null;
    }
  }

  async findTenQuestions(tags: any) {
    console.log("tags");
    console.log(tags);
    console.log("tags");
    try {
      let arr = [];
      if (tags.tags instanceof Array) {
        arr = [...tags.tags];
      } else {
        arr.push(tags.tags);
      }
      // console.log(`meu arr ${arr}`);
      const tags_ids = await this.prisma.tag.findMany({
        where: {
          name: {
            in: arr,
          },
        },
      });

      //getting only the ids
      let new_tags_ids = tags_ids.map((tag) => tag.id);

      console.log(new_tags_ids);

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

      console.log("teste");
      console.log(set_tag_ids);

      const ten_questions = await this.prisma.question_set.findMany({
        where: {
          id: {
            in: set_tag_ids,
          },
        },
      });
      console.log(ten_questions);

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

  async findRightAnswers(answers: any) {
    console.log(answers);

    try {
      const questionIds = answers.chosenAnswers.map((question: any) => {
        return question.questionId;
      });

      const answerIds = answers.chosenAnswers.map((answer: any) => {
        return answer.answerId;
      });

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

      const saveAnsweredSet =
        await this.prisma.history_answered_set_question.create({
          data: {
            user_data_id: answers.userId,
            question_set_id: set_data.question_set_id,
          },
        });

      // console.log("teste");
      // console.log(teste);

      const answersReturned = await this.prisma.answer.findMany({
        where: {
          question_id: {
            in: questionIds,
          },
          is_correct: true,
        },
      });

      const result = answersReturned.filter(
        (answer, index) => answer.id === answerIds[index]
      );

      console.log("result");
      console.log(result);

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

      const easy = 100;
      const normal = 150;
      const hard = 200;
      const very_hard = 250;

      function calculateLevel(
        experiencePoints: number,
        experienceThreshold: number,
        currentLevel: number
      ) {
        const level =
          currentLevel + Math.floor(experiencePoints / experienceThreshold);
        const remainingExperience =
          experienceThreshold - (experiencePoints % experienceThreshold);
        const experienceTowardsNextLevel =
          experiencePoints % experienceThreshold;

        return {
          level: level,
          remainingExperience: remainingExperience,
          experienceTowardsNextLevel: experienceTowardsNextLevel,
        };
      }

      function calculateExperienceThreshold(level: number) {
        // increase the threshold by 50 for each level
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

      // const currentLevel = calculateLevel(totalExp, experienceThreshold);
      const newExperience = userData.experience + totalExp;
      const currentLevel = calculateLevel(
        newExperience,
        experienceThreshold,
        userData.nivel
      );

      console.log("currentLevel");
      console.log(currentLevel);

      // const updatedUser = await this.prisma.user_data.update({
      //   where: {
      //     id: answers.userId,
      //   },
      //   data: {
      //     nivel: currentLevel.level,
      //     experience:
      //       currentLevel.experienceTowardsNextLevel + userData.experience,
      //   },
      // });
      let updatedUser = {};
      let hasLevelUp = false;

      if (newExperience >= experienceThreshold) {
        const remainingExperience = newExperience - experienceThreshold;
        const nextLevelThreshold = calculateExperienceThreshold(
          currentLevel.level + 1
        );

        if (remainingExperience >= nextLevelThreshold) {
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
              status_point_remain: userData.status_point_remain + 2,
            },
          });

          hasLevelUp = true;
        } else {
          const updatedExperience =
            currentLevel.experienceTowardsNextLevel + remainingExperience;

          updatedUser = await this.prisma.user_data.update({
            where: {
              id: answers.userId,
            },
            data: {
              nivel: currentLevel.level,
              experience: updatedExperience,
              status_point_remain: userData.status_point_remain + 2,
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

      // console.log("updatedUser");
      // console.log(updatedUser);

      // console.log(answersReturned);
      // console.log(answerIds);

      // console.log("questoes acertadas");
      // console.log(result);
      // return { ...result, hasLevelUp };
      //@ts-ignore
      // return result;
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
    console.log("questionSetId");
    console.log(questionSetId);
    console.log("newRating");
    console.log(newRating);

    const questionSet = await this.prisma.question_set.findFirst({
      where: { id: Number(questionSetId) },
      select: { id: true, rating: true },
      //
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
