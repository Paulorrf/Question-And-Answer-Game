export class AnswerRespostaDto {
  id_questao: number;
  qnt_acertos: number;
  respostas: [
    {
      id: number;
      is_correct: boolean;
    }
  ];
}
