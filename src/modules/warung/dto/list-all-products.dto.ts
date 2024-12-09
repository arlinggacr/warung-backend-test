import {
  PageableRequestDto,
  PageableResponseDto,
} from '@app/common/dto/pageable.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import {
  ProductDataInterface,
  ProductDataRequestInterface,
  ProductDataResponseInterface,
} from '../interface/list-all-products.interface';

export class ListAllProductsRequestDto
  extends PageableRequestDto
  implements ProductDataRequestInterface
{
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  categoryId: number;
}

export class ProductDto implements ProductDataInterface {
  @Expose()
  id: number;

  @Expose()
  categoryId: number;

  @Expose()
  categoryName: string;

  @Expose()
  sku: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  weight: number;

  @Expose()
  width: number;

  @Expose()
  length: number;

  @Expose()
  height: number;

  @Expose()
  image?: string;

  @Expose()
  price: number;
}

export class ProductDataResponseDto
  extends PageableResponseDto
  implements ProductDataResponseInterface
{
  @Expose()
  products: ProductDto;

  @Expose()
  pagination: PageableResponseDto;
}
