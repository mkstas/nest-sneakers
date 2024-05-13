import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodDto } from './create-good.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGoodDto extends PartialType(CreateGoodDto) {
  @IsString()
  @IsOptional()
  readonly image: string;
}
