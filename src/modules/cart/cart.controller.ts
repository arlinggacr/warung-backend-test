import { MethodLogger } from '@app/common/util/method-logger';
import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartRequestDto } from './dto/add-cart.dto';
import { ListAllCartsRequestDto } from './dto/list-all-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  logger: Logger;

  constructor(private cartService: CartService) {
    this.logger = new Logger(CartController.name);
  }

  @Post('explore/')
  @ApiOperation({ summary: 'Get all carts for a specific cartId' })
  async getAllCarts(
    @Body() listAllCartsReqDto: ListAllCartsRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.getAllCarts.name));
    return await this.cartService.getAllCarts(listAllCartsReqDto);
  }

  @Post('add/')
  @ApiOperation({ summary: 'Add a product to the cart' })
  async addProductToCart(
    @Body() addCartRequestDTO: AddCartRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.addProductToCart.name));
    return await this.cartService.addCartItem(addCartRequestDTO);
  }

  @Post('delete/:cartId')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  async deleteCart(@Param('cartId') cartId: number): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.deleteCart.name));
    return await this.cartService.deleteCart(cartId);
  }
}
