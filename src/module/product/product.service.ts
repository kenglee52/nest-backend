import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { MongoRepository } from "typeorm";
import { ProductDto } from "./dto/product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
         constructor(
                  @InjectRepository(Product)
                  private readonly productRepository: MongoRepository<Product>,
         ) { }

         async createProduct(dto: ProductDto): Promise<Product> {
                  try {
                           const cleanData: Record<string, any> = {};

                           Object.entries(dto).forEach(([key, value]) => {
                                    if (value !== undefined && value !== null) {
                                             cleanData[key] = value;
                                    }
                           });
                           if (cleanData.category) cleanData.category = new ObjectId(cleanData.category);
                           if (cleanData.unit) cleanData.unit = new ObjectId(cleanData.unit);
                           if (cleanData.owner) cleanData.owner = new ObjectId(cleanData.owner);
                           if (cleanData.issue) cleanData.issue = new Date(cleanData.issue);
                           if (cleanData.expiry) cleanData.expiry = new Date(cleanData.expiry);
                           const now = new Date();
                           cleanData.createdAt = now;
                           cleanData.updatedAt = now;
                           const result = await this.productRepository.insertOne(cleanData as any);
                           return {
                                    _id: result.insertedId,
                                    ...cleanData,
                           } as unknown as Product;

                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async findAllProducts(id: string): Promise<Product[]> {
                  try {
                           return await this.productRepository.find({
                                    where: { owner: new ObjectId(id) },
                           });
                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async updateProduct(id: string, dto: Partial<ProductDto>): Promise<Product> {
                  try {
                           const cleanData: Record<string, any> = {};
                           Object.entries(dto).forEach(([key, value]) => {
                                    if (value !== undefined && value !== null) {
                                             cleanData[key] = value;
                                    }
                           });
                           if (cleanData.category) cleanData.category = new ObjectId(cleanData.category);
                           if (cleanData.unit) cleanData.unit = new ObjectId(cleanData.unit);
                           if (cleanData.owner) cleanData.owner = new ObjectId(cleanData.owner);
                           if (cleanData.issue) cleanData.issue = new Date(cleanData.issue);
                           if (cleanData.expiry) cleanData.expiry = new Date(cleanData.expiry);
                           cleanData.updatedAt = new Date();

                           await this.productRepository.updateOne(
                                    { _id: new ObjectId(id) },
                                    { $set: cleanData }
                           );
                           const updatedProduct = await this.productRepository.findOne({
                                    where: { _id: new ObjectId(id) }
                           });

                           if (!updatedProduct) {
                                    throw new InternalServerErrorException("Product not found after update");
                           }

                           return updatedProduct;

                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async deleteProduct(id: string): Promise<Product> {
                  try {
                           const objectId = new ObjectId(id);
                           const productToDelete = await this.productRepository.findOne({
                                    where: { _id: objectId }
                           });
                           if (!productToDelete) {
                                    throw new InternalServerErrorException("Product not found or already deleted");
                           }
                           await this.productRepository.deleteOne({
                                    _id: objectId
                           });
                           return productToDelete;

                  } catch (error) {
                           console.error(error);
                           throw new InternalServerErrorException("Server error");
                  }
         }

         async searchProductByBarcode(barcode: string, owner: string): Promise<Product> {
                  try {
                      const ownerId = new ObjectId(owner);
                      const product = await this.productRepository.findOne({
                           where: {barcode: barcode, owner: ownerId}
                      });
                      if(!product) throw new NotFoundException("Not found product");
                      return product;
                  } catch (error) {
                      console.error(error);
                      throw new InternalServerErrorException("Server error");     
                  }
         }
}