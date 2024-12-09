import { Product } from '@app/common/entity';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AddProductRequestDto } from '../dto/add-product.dto';

@Injectable()
export class AddProductRepository {
  private logger: Logger;

  constructor(private entityManager: EntityManager) {
    this.logger = new Logger(AddProductRepository.name);
  }

  async addProduct(productData: AddProductRequestDto): Promise<Product> {
    const newProduct = this.entityManager.create(Product, {
      ...productData,
    });
    const savedProduct = await this.entityManager.save(Product, newProduct);
    return savedProduct;
  }
}
