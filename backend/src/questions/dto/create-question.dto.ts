import { MaxLength, MinLength } from "class-validator";

export class CreateQuestionDto {
  question_set: {
    description: string;
    title: string;
    difficulty: "easy" | "normal" | "hard" | "very_hard" | "expert";
    situation: "active" | "inactive" | "deleted";
  };
  questions: [
    {
      body: string;
      situation: "active" | "inactive" | "deleted";
      description_right_answer: string;
      user_data_id: number;
      answers: {
        body: string;
        is_correct: boolean;
      }[];
    }
  ];

  tags_primary: string[];

  tags_spec: string[];
}
