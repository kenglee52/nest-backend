import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductDto } from "./dto/product.dto";
import { MongoRepository } from "typeorm";
@Injectable()
export class ProductService {
         constructor(
           @InjectRepository(Product)
           private readonly productRepository: MongoRepository<Product>
         ){}

         async createProduct(dto: ProductDto): Promise<Product> {
             try {
                  const product:Product = await this.productRepository.create(dto);
                  return await this.productRepository.save(product);
             } catch (error) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error");
             }
         }
}