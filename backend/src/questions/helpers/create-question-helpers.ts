// create-question-helpers.ts

import { PrismaService } from "src/prisma/prisma.service";
import { CreateQuestionDto } from "../dto/create-question.dto";

export async function createQuestionSet(
  data: any,
  prismaService: PrismaService
) {
  return prismaService.question_set.create({
    data: {
      description: data.description,
      title: data.title,
      difficulty: data.difficulty,
      situation: "active",
    },
  });
}

export async function createQuestionsWithSetId(
  questions: CreateQuestionDto["data"]["questions"],
  setId: number,
  prismaService: PrismaService
) {
  const allQuestions = questions.map((question_subj) => {
    return {
      body: question_subj.body,
      // situation: "active",
      description_right_answer: question_subj.description_right_answer,
      user_data_id: question_subj.user_id as number, // Use the 'as number' assertion to specify the correct type
      question_set_id: setId,
    };
  });
  return prismaService.$transaction(
    allQuestions.map((question) =>
      prismaService.question.create({ data: question })
    )
  );
}

export async function updateQuestionSetWithQuestionNumber(
  setId: number,
  questionNumber: number,
  prismaService: PrismaService
) {
  return prismaService.question_set.update({
    where: {
      id: setId,
    },
    data: {
      question_number: questionNumber,
    },
  });
}

export function createAnswersArray(questions: any[], createQuestions: any[]) {
  const answersArr = [];
  for (let i = 0; i < createQuestions.length; i++) {
    for (let x = 0; x < questions[i].answers.length; x++) {
      answersArr.push({
        body: questions[i].answers[x].body,
        is_correct: questions[i].answers[x].is_correct,
        question_id: createQuestions[i].id,
      });
    }
  }
  return answersArr;
}

export async function createAnswers(
  answersArr: any[],
  prismaService: PrismaService
) {
  return prismaService.answer.createMany({ data: answersArr });
}

export async function createOrUpdateTags(
  tagsSpec: any[],
  prismaService: PrismaService
) {
  const upsertedNames = await prismaService.$transaction(
    tagsSpec.map((name) =>
      prismaService.tag.upsert({
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
  return upsertedNames;
}

export async function findPortalsIdByNames(
  portalNames: string[],
  prismaService: PrismaService
) {
  const portalsId = await prismaService.portal.findMany({
    where: {
      name: {
        in: portalNames,
      },
    },
    select: {
      id: true,
    },
  });
  return portalsId.map((value) => value.id);
}

export async function createPortalSpecs(
  tagsSpec: any[],
  portalsId: number[],
  prismaService: PrismaService
) {
  for (const portalId of portalsId) {
    await Promise.all(
      tagsSpec.map(async (name) => {
        return prismaService.portal_spec.upsert({
          where: {
            name: name,
          },
          create: {
            name: name,
            portal_id: portalId,
          },
          update: {},
          select: {
            id: true,
          },
        });
      })
    );
  }
}

export async function createQuestionSetTags(
  questionSetId: number,
  tagsSpec: any[],
  prismaService: PrismaService
) {
  const upsertedNames = await createOrUpdateTags(tagsSpec, prismaService);
  const allSetQuestionsTags = upsertedNames.map((tagId: { id: number }) => {
    return {
      tag_id: tagId.id,
      question_set_id: questionSetId,
    };
  });
  await prismaService.question_set_tag.createMany({
    data: allSetQuestionsTags,
  });
  return allSetQuestionsTags;
}
