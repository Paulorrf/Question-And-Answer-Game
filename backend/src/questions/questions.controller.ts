import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { ValidationPipe } from "src/utils/validation.pipe";
import { AnswerQuestionDto } from "./dto/answer-question.dto";
import { ReportQuestion } from "./dto/report-question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post("create")
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post("findTen")
  findTenQuestions(@Body() tags: string[]) {
    return this.questionsService.findTenQuestions(tags);
  }

  @Post("rightAnswers")
  findRightAnswers(@Body() answers: AnswerQuestionDto) {
    return this.questionsService.findRightAnswers(answers);
  }

  @Post("reportSet")
  reportQuestionSet(@Body() reportValues: ReportQuestion) {
    return this.questionsService.ReportQuestion(reportValues);
  }

  @Get("set/:id")
  findOneSetQuestion(@Param("id") id: string) {
    return this.questionsService.findOneSetQuestion(+id);
  }

  @Get("findbymail/:id")
  findQuestionsByUserEmail(@Param("id") id: number) {
    return this.questionsService.findQuestionsByUserEmail(+id);
  }

  @Get("pagination")
  questionsPagination(
    @Query("page") page: number,
    @Query("size") size: number,
    @Query("userId") userId: number
  ) {
    return this.questionsService.questionsPagination(page, size, userId);
  }

  @Get("setnumber")
  questionSetNumber(@Query("userId") userId: number) {
    return this.questionsService.questionSetNumber(userId);
  }

  @Get("questions/:id")
  findQuestions(@Param("id") id: string) {
    return this.questionsService.findQuestions(+id);
  }

  @Get("question/:id")
  findOneQuestion(@Param("id") id: string) {
    return this.questionsService.findOneQuestion(+id);
  }

  @Patch("rating/:id/rating")
  async updateRating(@Param("id") id: number, @Body("rating") rating: number) {
    const updatedQuestionSet = await this.questionsService.updateRating(
      id,
      rating
    );
    return updatedQuestionSet;
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }
}
