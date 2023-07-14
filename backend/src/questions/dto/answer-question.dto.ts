export class AnswerQuestionDto {
  chosenAnswers: [
    {
      questionId: number;
      answerId: number;
    }
  ];
  userId: number;
}
