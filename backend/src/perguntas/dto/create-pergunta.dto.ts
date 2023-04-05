export class CreatePerguntaDto {
  body: string;
  theme?: string;
  level: "easy" | "normal" | "hard" | "very_hard" | "expert";
  answer: [
    {
      body: string;
      is_correct: boolean;
    }
  ];
  tags: {
    id: string;
  };
  user_id: number;
}
