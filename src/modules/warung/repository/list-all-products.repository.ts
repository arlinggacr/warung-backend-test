import { Product } from '@app/common/entity';
import { MethodLogger } from '@app/common/util/method-logger';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ListAllProductsRequestDto } from '../dto/list-all-products.dto';

@Injectable()
export class ExploreProductRepository {
  private logger: Logger;

  constructor(private entityManager: EntityManager) {
    this.logger = new Logger(ExploreProductRepository.name);
  }

  async findAllProducts({
    page,
    size,
    name,
  }: ListAllProductsRequestDto): Promise<any> {
    this.logger.log(MethodLogger.Repository(this.findAllProducts.name));

    const queryProduct = this.entityManager
      .createQueryBuilder(Product, 'p')
      .select([
        'p.id',
        'p.categoryId',
        'p.categoryName',
        'p.sku',
        'p.name',
        'p.description',
        'p.weight',
        'p.width',
        'p.length',
        'p.height',
        'p.image',
        'p.price',
      ]);

    if (name) {
      queryProduct.andWhere('p.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    const productCount = await queryProduct.getCount();
    const products = await queryProduct
      .limit(size)
      .offset((page - 1) * size)
      .getMany();

    return {
      products,
      pagination: {
        total_data: productCount,
        total_page: Math.ceil(productCount / size),
        data_count: products.length,
      },
    };
  }
}
