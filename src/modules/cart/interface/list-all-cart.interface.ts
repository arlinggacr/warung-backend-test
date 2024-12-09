import { Product } from '@app/common/entity';
import { IPageableResponse } from '@app/common/swagger/interface/pageable.interface';

export interface CartDataInterface {
  id: number;
  product: Product;
  quantity: number;
  createdAt: Date;
}

export interface CartDataRequestInterface {
  productName?: string;
}

export interface CartDataResponseInterface {
  carts: CartDataInterface[];
  pagination: IPageableResponse;
}
