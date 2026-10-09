import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductColorImageDto {
  @IsOptional()
  @IsString()
  color?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];
}