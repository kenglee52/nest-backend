import { IsString, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongodb";
export class CategoryDto {
   @IsString()
   @IsNotEmpty({message: "ກະລຸນາປ້ອນຊື່ປະເພດ"})
   name: string;

   @IsString()
   owner: ObjectId;
}