import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductColorImageDto } from './product-color-image.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsMongoId()
  @IsNotEmpty()
  unit: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  importPrice?: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  proPrice?: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorImageDto)
  colorImages?: ProductColorImageDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  size?: string[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  issue?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiry?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  owner: string;
}