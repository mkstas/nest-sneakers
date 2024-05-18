import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GoodsModule } from './core/goods/goods.module';
import { ClientsModule } from './core/clients/clients.module';
import { OrdersModule } from './core/orders/orders.module';

@Module({
  imports: [PrismaModule, GoodsModule, ClientsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
