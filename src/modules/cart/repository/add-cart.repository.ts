import { Cart, Product } from '@app/common/entity';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AddCartRequestDto } from '../dto/add-cart.dto';

@Injectable()
export class AddCartRepository {
  private logger: Logger;

  constructor(private entityManager: EntityManager) {
    this.logger = new Logger(AddCartRepository.name);
  }

  async addCart(addCartRequestDto: AddCartRequestDto): Promise<Cart> {
    const product = await this.entityManager.findOne(Product, {
      where: { id: addCartRequestDto.productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    let cartItem = await this.entityManager.findOne(Cart, {
      where: {
        product: { id: addCartRequestDto.productId },
        id: addCartRequestDto.cartId,
      },
    });

    if (cartItem) {
      cartItem.quantity += addCartRequestDto.quantity;
      return await this.entityManager.save(Cart, cartItem);
    }

    cartItem = this.entityManager.create(Cart, {
      product,
      quantity: addCartRequestDto.quantity,
      cartId: addCartRequestDto.cartId,
    });

    return await this.entityManager.save(Cart, cartItem);
  }
}
