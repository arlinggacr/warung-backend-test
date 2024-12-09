import { Module } from '@nestjs/common';
import { ProductModule } from './modules/warung/warung.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
