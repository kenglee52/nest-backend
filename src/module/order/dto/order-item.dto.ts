import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsOptional, 
  Min, 
  IsMongoId 
} from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsString()
  barcode?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  image?: string;
}