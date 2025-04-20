import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePricePointDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
