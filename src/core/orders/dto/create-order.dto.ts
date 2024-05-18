import { Good } from '@prisma/client';
import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(6)
  readonly phoneNumber: string;

  @IsArray()
  readonly goods: Good[];
}
