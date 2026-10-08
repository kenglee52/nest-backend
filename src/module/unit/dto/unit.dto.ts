import { IsString, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongodb";
export class UnitDto {
   @IsString()
   @IsNotEmpty({message: "ກະລຸນາປ້ອນຊື່ຫົວໜ່ວຍ"})
   name: string;

   @IsString()
   owner: ObjectId;
}