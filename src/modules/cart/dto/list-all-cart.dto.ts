import {
  PageableRequestDto,
  PageableResponseDto,
} from '@app/common/dto/pageable.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListAllCartsRequestDto extends PageableRequestDto {
  @IsString()
  @IsOptional()
  productName?: string;

  @IsInt()
  @IsOptional()
  cartId?: number;
}

export class CartDto {
  @Expose()
  id: number;

  @Expose()
  productName: string;

  @Expose()
  productPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  productImage?: string;
}

export class CartDataResponseDto extends PageableResponseDto {
  @Expose()
  carts: CartDto;

  @Expose()
  pagination: PageableResponseDto;
}
