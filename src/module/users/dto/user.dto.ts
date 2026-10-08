import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  laoName: string;

  @IsOptional()
  @IsString()
  laoLastname?: string;

  @IsString()
  @IsNotEmpty()
  engName: string;

  @IsOptional()
  @IsString()
  engLastname?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsDateString()
  birth?: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  bornProvince?: string;

  @IsOptional()
  @IsString()
  bornDistrict?: string;

  @IsOptional()
  @IsString()
  bornVillage?: string;

  @IsOptional()
  @IsString()
  presentProvince?: string;

  @IsOptional()
  @IsString()
  presentDistrict?: string;

  @IsOptional()
  @IsString()
  presentVillage?: string;

  @IsOptional()
  @IsString()
  documentType?: string;

  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documentImage?: string[];

  @IsOptional()
  @IsString()
  brandType?: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @IsOptional()
  @IsDateString()
  registrationDate?: string;

  @IsOptional()
  @IsString()
  registrationImage?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
