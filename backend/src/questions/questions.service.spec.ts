// import { PrismaService } from 'src/prisma/prisma.service';
// import { createQuestionSet, createQuestionsWithSetId, updateQuestionSetWithQuestionNumber, createAnswersArray, createAnswers, createOrUpdateTags, findPortalsIdByNames, createPortalSpecs, createQuestionSetTags } from './create-question-helpers';
// import { CreateQuestionDto } from './dto/create-question.dto';

// const mockPrismaService: Partial<PrismaService> = {
//   question_set: {
//     create: jest.fn(),
//     update: jest.fn(),
//   },
//   question: {
//     create: jest.fn(),
//   },
//   answer: {
//     createMany: jest.fn(),
//   },
//   tag: {
//     upsert: jest.fn(),
//   },
//   portal: {
//     findMany: jest.fn(),
//   },
//   portal_spec: {
//     upsert: jest.fn(),
//   },
//   question_set_tag: {
//     createMany: jest.fn(),
//   },
// };

// describe('create', () => {
//   const createQuestionDto: CreateQuestionDto = {
//     data: {
//       question_set: {
//         description: 'Test Question Set',
//         title: 'Test Question Set Title',
//         difficulty: 'easy',
//         situation: 'active',
//       },
//       questions: [
//         {
//           body: 'Test Question 1',
//           situation: 'active',
//           description_right_answer: 'Test Right Answer',
//           user_id: 1,
//           answers: [
//             {
//               body: 'Answer 1',
//               is_correct: true,
//             },
//             {
//               body: 'Answer 2',
//               is_correct: false,
//             },
//           ],
//         },
//       ],
//       tags_primary: ['Primary Tag 1', 'Primary Tag 2'],
//       tags_spec: ['Spec Tag 1', 'Spec Tag 2'],
//     },
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should create a question', async () => {
//     // Mocking the helper functions
//     const newQuestionSet = { id: 1 };
//     const createQuestions = [{ id: 1 }];
//     const answersArr = [{ body: 'Answer 1', is_correct: true, question_id: 1 }];

//     createQuestionSet.mockResolvedValue(newQuestionSet);
//     createQuestionsWithSetId.mockResolvedValue(createQuestions);
//     createAnswersArray.mockReturnValue(answersArr);
//     createAnswers.mockResolvedValue({}); // Assuming createAnswers doesn't return anything important for this test
//     createOrUpdateTags.mockResolvedValue([]);
//     findPortalsIdByNames.mockResolvedValue([]);
//     createPortalSpecs.mockResolvedValue({});
//     createQuestionSetTags.mockResolvedValue([]);

//     // Import the function containing the 'create' function and invoke it
//     const { create } = require('./your-file-name'); // Replace 'your-file-name' with the actual file name

//     const result = await create(createQuestionDto, mockPrismaService as PrismaService);

//     expect(result).toBe('pergunta criada com sucesso');
//     expect(createQuestionSet).toHaveBeenCalledTimes(1);
//     expect(createQuestionsWithSetId).toHaveBeenCalledTimes(1);
//     expect(createAnswersArray).toHaveBeenCalledTimes(1);
//     expect(createAnswers).toHaveBeenCalledTimes(1);
//     expect(createOrUpdateTags).toHaveBeenCalledTimes(1);
//     expect(findPortalsIdByNames).toHaveBeenCalledTimes(1);
//     expect(createPortalSpecs).toHaveBeenCalledTimes(1);
//     expect(createQuestionSetTags).toHaveBeenCalledTimes(1);
//     expect(mockPrismaService.question_set.update).toHaveBeenCalledTimes(1);
//   });

//   it('should handle errors and return error message', async () => {
//     // Mocking the helper functions to throw an error
//     createQuestionSet.mockRejectedValue(new Error('Database error'));

//     // Import the function containing the 'create' function and invoke it
//     const { create } = require('./your-file-name'); // Replace 'your-file-name' with the actual file name

//     const result = await create(createQuestionDto, mockPrismaService as PrismaService);

//     expect(result).toBe('erro ao criar questão');
//   });
// });
