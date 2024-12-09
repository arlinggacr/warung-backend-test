import { Cart, Product } from '@app/common/entity';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ListAllCartsRequestDto } from '../dto/list-all-cart.dto'; // Assuming you have the DTO for request

@Injectable()
export class ExploreCartRepository {
  private logger: Logger;

  constructor(private entityManager: EntityManager) {
    this.logger = new Logger(ExploreCartRepository.name);
  }

  async findAllCarts({
    cartId,
    page,
    size,
  }: ListAllCartsRequestDto): Promise<any> {
    this.logger.log(`Fetching carts for cartId ${cartId}`);

    const queryCart = this.entityManager
      .createQueryBuilder(Cart, 'c')
      .innerJoinAndSelect(Product, 'p', 'c.productId = p.id')
      .select([
        'c.id',
        'c.quantity',
        'p.name as product_name',
        'p.price as product_price',
        'p.image as product_image',
      ])
      .where('c.id = :cartId', { cartId });

    const cartCount = await queryCart.getCount();

    const carts = await queryCart
      .limit(size)
      .offset((page - 1) * size)
      .getRawMany();

    return {
      carts,
      pagination: {
        total_data: cartCount,
        total_page: Math.ceil(cartCount / size),
        data_count: carts.length,
      },
    };
  }
}
