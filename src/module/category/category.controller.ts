import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { RolesGuard } from "../users/roles.guard";
import { Roles } from "../users/roles.decorator";

@Controller("category")
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles("SHOP_OWNER")
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  @Roles("SHOP_OWNER", "CUSTOMER")
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Get("byOwner/:id")
  @Roles("SHOP_OWNER", "CUSTOMER")
  findAllCategoryByOwner(@Param("id") id: string) {
    return this.categoryService.findAllCategoryByOwner(id);
  }

  @Put(":id")
  @Roles("SHOP_OWNER")
  updateCategory(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(dto, id);
  }

  @Delete(":id")
  @Roles("SHOP_OWNER")
  deleteCategory(@Param("id") id: string) {
    return this.categoryService.deleteCategory(id);
  }
}