import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  body: string;
  situation: 'active' | 'inactive' | 'deleted';
  description_right_answer: string;
  user_data_id: number;
}
