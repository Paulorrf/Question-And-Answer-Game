export class CreatePerguntaDto {
  data: [
    {
      question: string;
      answer1: string;
      answer2: string;
      answer3: string;
      answer4: string;
      tags: Array<string>;
      answer: number;
      difficulty: string;
      // body: string;
      // theme?: string;
      // level: "easy" | "normal" | "hard" | "very_hard" | "expert";
      // answer: [
      //   {
      //     body: string;
      //     is_correct: boolean;
      //     description: string;
      //   }
      // ];
      // tags: {
      //   id: string;
      // };
      // user_id: number;
    }
  ];
}
