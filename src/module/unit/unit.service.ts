import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Unit } from "./entities/unit.entity";
import { UnitDto } from "./dto/unit.dto";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class UnitService {
         constructor
                  (
                           @InjectRepository(Unit)
                           private readonly unitRepository: MongoRepository<Unit>
                  ) { }

         async createUnit(dto: UnitDto): Promise<Unit> {
                  try {
                           const unit = await this.unitRepository.create(dto);
                           return await this.unitRepository.save(unit);
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async findAllUnits(): Promise<Unit[]> {
                  try {
                           return await this.unitRepository.find();
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async findAllUnitByOwner(id: string): Promise<Unit[]> {
                  try {
                           return await this.unitRepository.find({
                                    where: { owner: id }
                           })
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async updateUnit(dto: UnitDto, id: string): Promise<Unit> {
                  try {
                           const unit = await this.unitRepository.findOneBy({ _id: id });
                           if (!unit) throw new NotFoundException("ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການແກ້ໄຂ");
                           unit.name = dto.name;
                           return await this.unitRepository.save(unit);
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async deleteUnit(id: string): Promise<Unit> {
                  if (!ObjectId.isValid(id)) {
                           throw new BadRequestException('id ບໍ່ຖືກຕ້ອງ');
                  }

                  try {
                           const _id = new ObjectId(id);

                           const unit = await this.unitRepository.findOneBy({ _id });
                           if (!unit) {
                                    throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການລົບ');
                           }
                           await this.unitRepository.deleteOne({ _id });
                           return unit;
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException('Server error');
                  }
         }

}