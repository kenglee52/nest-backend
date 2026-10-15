import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Income } from "./entity/income.entity";
import { MongoRepository } from "typeorm";
import { IncomeDto } from "./dto/income.dto";

@Injectable()
export class IncomeService {
         constructor(
                  @InjectRepository(Income)
                  private readonly incomeRepository: MongoRepository<Income>
         ) { }

         async createIncome(dto: IncomeDto): Promise<Income> {
                  try {
                           const result = await this.incomeRepository.create(dto);
                           return await this.incomeRepository.save(result);
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error")
                  }
         }


         async findAllIncomes(): Promise<Income[]> {
                  try {
                           return await this.incomeRepository.find();
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error")
                  }
         }
}
