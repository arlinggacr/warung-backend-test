import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/warung/warung.module';

@Module({
  imports: [ProductModule, CartModule],
})
export class AppModule {}
