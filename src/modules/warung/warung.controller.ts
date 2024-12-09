import { MethodLogger } from '@app/common/util/method-logger';
import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddProductRequestDto } from './dto/add-product.dto';
import { ListAllProductsRequestDto } from './dto/list-all-products.dto';
import { ProductService } from './warung.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  logger: Logger;

  constructor(private productService: ProductService) {
    this.logger = new Logger(ProductController.name);
  }

  @Post('explore/')
  @ApiOperation({ summary: 'Explore all products' })
  async exploreProduct(
    @Body() listAllProductsReqDto: ListAllProductsRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.exploreProduct.name));
    return await this.productService.getAllProduct(listAllProductsReqDto);
  }

  @Post('add/')
  @ApiOperation({ summary: 'Add a new product' })
  async addProduct(
    @Body() addProductRequestDTO: AddProductRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.addProduct.name));
    return await this.productService.addProduct(addProductRequestDTO);
  }

  @Post('delete/:productId')
  @ApiOperation({ summary: 'Delete a product by ID' })
  async deleteProduct(@Param('productId') productId: number): Promise<any> {
    this.logger.log(MethodLogger.Controller(this.deleteProduct.name));
    return await this.productService.deleteProduct(productId);
  }
}
