import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";

@Controller("product")
export class ProductController {
         constructor(private readonly productService: ProductService){}

         @Post()
         @HttpCode(HttpStatus.CREATED)
         createProduct(@Body() dto: ProductDto) {
            return this.productService.createProduct(dto);
         }

         @Get(":id")
         findAllProducts(@Param("id") id: string) {
            return this.productService.findAllProducts(id);
         }

         @Put(":id")
         updateProduct(
            @Param("id") id: string,
            @Body() dto: Partial<ProductDto>
         ) {
            return this.productService.updateProduct(id, dto);
         }

         @Delete(":id")
         deleteProduct(@Param("id") id: string) {
            return this.productService.deleteProduct(id);
         }

         @Get("search/:owner")
         searchProduct(@Param("owner") owner: string, @Query("barcode") barcode: string){
            return this.productService.searchProductByBarcode(barcode, owner);
         }
}