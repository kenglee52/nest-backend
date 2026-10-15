import { IsNumber, IsOptional, IsString} from "class-validator";

export class IncomeDto {
    @IsNumber()
    amount: number;

    @IsOptional()
    payBy: any;
}