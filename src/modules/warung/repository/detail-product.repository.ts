import { Product } from '@app/common/entity';
import { MethodLogger } from '@app/common/util/method-logger';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class DetailProductRepository {
  private logger: Logger;

  constructor(private entityManager: EntityManager) {
    this.logger = new Logger(DetailProductRepository.name);
  }

  async detailProduct(id: number): Promise<any> {
    this.logger.log(MethodLogger.Repository(this.detailProduct.name));

    const result = await this.entityManager
      .createQueryBuilder()
      .select([
        'p.id',
        'p.name',
        'p.sku',
        'p.price',
        'p.description',
        'p.weight',
        'p.width',
        'p.length',
        'p.height',
        'p.category_name',
        'p.image',
      ])
      .from(Product, 'p')
      .where('p.id = :productId')
      .setParameter('productId', id)
      .getRawMany();

    const rowResult: any = result.map((item: any) => ({
      id: item.id,
      name: item.name,
      sku: item.sku,
      price: +item.price,
      description: item.description,
      weight: item.weight,
      width: item.width,
      length: item.length,
      height: item.height,
      categoryName: item.category_name,
      image: item.image,
    }));

    return rowResult[0];
  }
}
