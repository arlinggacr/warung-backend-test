import { ConfigModule, DatabaseModule } from '@app/common';
import { Cart, Product } from '@app/common/entity';
import { UtilModule } from '@app/common/util/util.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AddCartRepository } from './repository/add-cart.repository';
import { ExploreCartRepository } from './repository/list-all-cart.repository';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UtilModule,
    TypeOrmModule.forFeature([Cart, Product]),
  ],
  providers: [CartService, ExploreCartRepository, AddCartRepository],
  controllers: [CartController],
})
export class CartModule {}
