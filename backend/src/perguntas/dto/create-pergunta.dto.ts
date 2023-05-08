export class CreatePerguntaDto {
  data: [
    {
      body: string;
      theme?: string;
      level: "easy" | "normal" | "hard" | "very_hard" | "expert";
      answer: [
        {
          body: string;
          is_correct: boolean;
          description: string;
        }
      ];
      tags: {
        id: string;
      };
      user_id: number;
    }
  ];
}
