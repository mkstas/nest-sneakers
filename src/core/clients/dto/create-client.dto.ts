import { IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(6)
  readonly phoneNumber: string;
}
