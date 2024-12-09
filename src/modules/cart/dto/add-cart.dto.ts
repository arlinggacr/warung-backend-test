import { IsInt } from 'class-validator';

export class AddCartRequestDto {
  @IsInt()
  cartId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}
