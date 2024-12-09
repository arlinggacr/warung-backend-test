import { Cart, Product } from '@app/common/entity';
import { ParseException } from '@app/common/util/exception';
import { MethodLogger } from '@app/common/util/method-logger';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCartRequestDto } from './dto/add-cart.dto';
import { ListAllCartsRequestDto } from './dto/list-all-cart.dto';
import { ExploreCartRepository } from './repository/list-all-cart.repository';

@Injectable()
export class CartService {
  private logger: Logger;

  constructor(
    private exploreCartRepository: ExploreCartRepository,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.logger = new Logger(CartService.name);
  }

  async getAllCarts(
    ListAllCartRequestDto: ListAllCartsRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Service(this.getAllCarts.name));
    try {
      return await this.exploreCartRepository.findAllCarts(
        ListAllCartRequestDto,
      );
    } catch (e) {
      this.logger.error(e);
      ParseException(e);
    }
  }

  async deleteCart(id: number): Promise<void> {
    this.logger.log(MethodLogger.Service(this.deleteCart.name));
    try {
      await this.cartRepository.delete({
        id: id,
      });
    } catch (e) {
      this.logger.error(e);
      ParseException(e);
    }
  }

  async addCartItem(addCartRequestDTO: AddCartRequestDto): Promise<Cart> {
    this.logger.log(MethodLogger.Service(this.addCartItem.name));
    try {
      return await this.cartRepository.save(addCartRequestDTO);
    } catch (e) {
      this.logger.error(e);
      ParseException(e);
    }
  }
}
