import { IsString } from "class-validator";

export class UserLoginDto {
   @IsString()
   tel: string;

   @IsString()
   password: string;
}