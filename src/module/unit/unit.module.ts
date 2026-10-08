import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Unit } from "./entities/unit.entity";
import { UnitController } from "./unit.controller";
import { UnitService } from "./unit.service";

@Module({
   imports: [TypeOrmModule.forFeature([Unit])],
   controllers: [UnitController],
   providers: [UnitService],
   exports : [UnitService]
})
export class UnitModule {}