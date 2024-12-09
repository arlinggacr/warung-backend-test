import { ConfigModule, DatabaseModule } from '@app/common';
import { Cart } from '@app/common/entity';
import { UtilModule } from '@app/common/util/util.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExploreCartRepository } from './repository/list-all-cart.repository';
// import { SeederService } from './seeders/seeder.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AddCartRepository } from './repository/add-cart.repository';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UtilModule,
    TypeOrmModule.forFeature([Cart]),
  ],
  providers: [
    CartService,
    // SeederService,
    ExploreCartRepository,
    AddCartRepository,
  ],
  controllers: [CartController],
})
export class CartModule {}
