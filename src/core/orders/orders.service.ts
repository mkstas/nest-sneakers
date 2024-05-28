import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from '../clients/clients.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as uuid from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clientsService: ClientsService,
  ) {}

  async create(dto: CreateOrderDto) {
    const client = await this.clientsService.create({ phoneNumber: dto.phoneNumber });

    const date = new Date();
    const orderNumber =
      `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}/${uuid.v4().slice(-4)}-${client.id}`.toUpperCase();

    const order = await this.prismaService.order.create({
      data: {
        clientId: client.id,
        orderNumber,
      },
    });
    const data = dto.goods.map(good => ({ orderId: order.id, goodId: good.id }));
    await this.prismaService.orderGood.createMany({ data });
    return { orderNumber };
  }
}
