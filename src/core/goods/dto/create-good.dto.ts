import { IsNumber, IsNumberString, IsString, Min, MinLength } from 'class-validator';

export class CreateGoodDto {
  @IsString({ message: 'Не является строкой' })
  @MinLength(3, { message: 'Не менее 3 символов' })
  readonly title: string;

  @IsNumberString()
  // @IsNumber(undefined, { message: 'Не является числом' })
  // @Min(0, { message: 'Минимальное значение 0' })
  readonly price: number;
}
