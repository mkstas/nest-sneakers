import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [ClientsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
