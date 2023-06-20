export class CreateAnswerDto {
  question_set_id: number;
  portal_spec: number;
  user_id: number;
  data: {
    question_id: number;
    answer_id: number;
    correct_answer_id: number;
  }[];
}
