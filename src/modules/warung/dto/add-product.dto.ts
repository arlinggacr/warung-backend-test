import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddProductRequestDto {
  @IsString()
  categoryName: string;

  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  weight: number;

  @IsInt()
  width: number;

  @IsInt()
  length: number;

  @IsInt()
  height: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsInt()
  price: number;
}
