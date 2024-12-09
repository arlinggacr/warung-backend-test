import { ConfigModule, DatabaseModule } from '@app/common';
import { Product } from '@app/common/entity';
import { UtilModule } from '@app/common/util/util.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddProductRepository } from './repository/add-product.repository';
import { ExploreProductRepository } from './repository/list-all-products.repository';
// import { SeederService } from './seeders/seeder.service';
import { ProductController } from './warung.controller';
import { ProductService } from './warung.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UtilModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    ProductService,
    // SeederService,
    ExploreProductRepository,
    AddProductRepository,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
