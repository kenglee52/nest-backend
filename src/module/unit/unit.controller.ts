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
import { UnitService } from "./unit.service";
import { UnitDto } from "./dto/unit.dto";
import { RolesGuard } from "../users/roles.guard";
import { Roles } from "../users/roles.decorator";

@Controller("unit")
@UseGuards(RolesGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @Roles("SHOP_OWNER")
  @HttpCode(HttpStatus.CREATED)
  createUnit(@Body() dto: UnitDto) {
    return this.unitService.createUnit(dto);
  }

  @Get()
  @Roles("SHOP_OWNER", "CUSTOMER")
  findAllUnits() {
    return this.unitService.findAllUnits();
  }

  @Get("byOwner/:id")
  @Roles("SHOP_OWNER", "CUSTOMER")
  findAllUnitByOwner(@Param("id") id: string) {
    return this.unitService.findAllUnitByOwner(id);
  }

  @Put(":id")
  @Roles("SHOP_OWNER")
  updateUnit(@Param("id") id: string, @Body() dto: UnitDto) {
    return this.unitService.updateUnit(dto, id);
  }

  @Delete(":id")
  @Roles("SHOP_OWNER")
  deleteUnit(@Param("id") id: string) {
    return this.unitService.deleteUnit(id);
  }
}