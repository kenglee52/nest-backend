import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsArray, 
  ValidateNested, 
  IsDateString, 
  IsMongoId, 
  Min, 
  ArrayMinSize 
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  logisticType?: string;

  @IsOptional()
  @IsString()
  logisticName?: string;

  @IsOptional()
  @IsMongoId()
  sellerId?: string;

  @IsOptional()
  @IsMongoId()
  customerId?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;
}