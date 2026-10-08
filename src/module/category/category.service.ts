import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryDto } from "./dto/category.dto";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class CategoryService {
         constructor
                  (
                           @InjectRepository(Category)
                           private readonly categoryRepository: MongoRepository<Category>
                  ) { }

         async createCategory(dto: CategoryDto): Promise<Category> {
                  try {
                           const category = await this.categoryRepository.create(dto);
                           return await this.categoryRepository.save(category);
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async findAllCategories(): Promise<Category[]> {
                  try {
                           return await this.categoryRepository.find();
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async findAllCategoryByOwner(id: string): Promise<Category[]> {
                  try {
                           return await this.categoryRepository.find({
                                    where: { owner: id }
                           })
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async updateCategory(dto: CategoryDto, id: string): Promise<Category> {
                  try {
                           const category = await this.categoryRepository.findOneBy({ _id: id });
                           if (!category) throw new NotFoundException("ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການແກ້ໄຂ");
                           category.name = dto.name;
                           return await this.categoryRepository.save(category);
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async deleteCategory(id: string): Promise<Category> {
                  if (!ObjectId.isValid(id)) {
                           throw new BadRequestException('id ບໍ່ຖືກຕ້ອງ');
                  }

                  try {
                           const _id = new ObjectId(id);

                           const category = await this.categoryRepository.findOneBy({ _id });
                           if (!category) {
                                    throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການລົບ');
                           }
                           await this.categoryRepository.deleteOne({ _id });
                           return category;
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException('Server error');
                  }
         }

}