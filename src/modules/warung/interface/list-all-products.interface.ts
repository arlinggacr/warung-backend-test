import { IPageableResponse } from '@app/common/swagger/interface/pageable.interface';

export interface ProductDataInterface {
  id: number;
  categoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description?: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image?: string;
  price: number;
}

export interface ProductDataRequestInterface {
  name: string;
}

export interface ProductDataResponseInterface {
  products: ProductDataInterface;
  pagination: IPageableResponse;
}
