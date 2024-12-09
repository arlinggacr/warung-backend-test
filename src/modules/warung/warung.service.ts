import { Product } from '@app/common/entity';
import { ParseException } from '@app/common/util/exception';
import { MethodLogger } from '@app/common/util/method-logger';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductRequestDto } from './dto/add-product.dto';
import { ListAllProductsRequestDto } from './dto/list-all-products.dto';
import { DetailProductRepository } from './repository/detail-product.repository';
import { ExploreProductRepository } from './repository/list-all-products.repository';

@Injectable()
export class ProductService {
  private logger: Logger;

  constructor(
    private exploreProductRepository: ExploreProductRepository,
    private detailProductRepository: DetailProductRepository,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.logger = new Logger(ProductService.name);
  }

  async getAllProduct(
    exploreProductRequestDto: ListAllProductsRequestDto,
  ): Promise<any> {
    this.logger.log(MethodLogger.Service(this.getAllProduct.name));
    try {
      return await this.exploreProductRepository.findAllProducts(
        exploreProductRequestDto,
      );
    } catch (e) {
      this.logger.error(e);
      ParseException(e);
    }
  }

  async getDetailProduct(id: number): Promise<any> {
    this.logger.log(MethodLogger.Service(this.getAllProduct.name));
    try {
      return await this.detailProductRepository.detailProduct(id);
    } catch (e) {
      this.logger.error(e);
      ParseException(e);
    }
  }

  async deleteProduct(id: number) {
    this.logger.log(MethodLogger.Service(this.deleteProduct.name));
    try {
      return await this.productRepository.delete({
        id: id,
      });
    } catch (e) {
      ParseException(e);
    }
  }

  async addProduct(productData: AddProductRequestDto): Promise<Product> {
    this.logger.log(MethodLogger.Service(this.addProduct.name));
    try {
      return this.productRepository.save(productData);
    } catch (e) {
      ParseException(e);
    }
  }
}
