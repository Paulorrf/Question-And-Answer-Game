import { Injectable } from "@nestjs/common";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async answerQuestion(createAnswerDto: CreateAnswerDto[]) {
    try {
      const history_ans_quest = [];
      const answers_options = [];

      createAnswerDto.map(async (answer) => {
        // if (answer.answer_id === answer.correct_answer_id) {
        //   answers_options.push({
        //     question_id: answer.question_id,
        //     is_correct: true,
        //   });
        // } else {
        //   answers_options.push({
        //     question_id: answer.question_id,
        //     is_correct: false,
        //   });
        // }

        // history_ans_quest.push({
        //   user_data_id: createAnswerDto.user_id,
        //   portal_spec_id: createAnswerDto.portal_spec,
        //   question_id: answer.question_id,
        //   chosen_answer_id: answer.answer_id,
        // });

        await this.prisma.history_answered_question.create({
          data: {
            user_data_id: answer.userId,
            question_id: answer.questionId,
            chosen_answer_id: answer.answerId,
          },
        });
      });

      // await this.prisma.history_answered_set_question.create({
      //   data: {
      //     user_data_id: createAnswerDto.user_id,
      //     question_set_id: createAnswerDto.question_set_id,
      //   },
      // });

      return answers_options;
    } catch (error) {
      console.log("deu erro ao responder questao");
      console.log(error);
      return "erro ao responder questao";
    }
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
