import { Cart, Order, OrderItem, Product } from '@app/common/entity';
import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          entities: [Product, Cart, OrderItem, Order],
          logging: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
