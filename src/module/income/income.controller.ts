import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IncomeDto } from "./dto/income.dto";
import { IncomeService } from "./income.service";

@Controller("income")
export class IncomeController {
         constructor(private readonly incomeService: IncomeService) { }
         @Post()
         @HttpCode(HttpStatus.CREATED)
         createIncome(@Body() dto: IncomeDto) {
                  return this.incomeService.createIncome(dto);
         }

         @Get()
         findAllIncomes() {
                  return this.incomeService.findAllIncomes();
         }
}