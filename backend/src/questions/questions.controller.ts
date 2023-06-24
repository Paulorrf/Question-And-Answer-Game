import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { ValidationPipe } from "src/utils/validation.pipe";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post("findTen")
  findTenQuestions(@Body() tags: string[]) {
    return this.questionsService.findTenQuestions(tags);
  }

  @Post("rightAnswers")
  findRightAnswers(@Body() answers: any) {
    return this.questionsService.findRightAnswers(answers);
  }

  @Get("set/:id")
  findOneSetQuestion(@Param("id") id: string) {
    return this.questionsService.findOneSetQuestion(+id);
  }

  @Get("questions/:id")
  findQuestions(@Param("id") id: string) {
    return this.questionsService.findQuestions(+id);
  }

  @Get("question/:id")
  findOneQuestion(@Param("id") id: string) {
    return this.questionsService.findOneQuestion(+id);
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
