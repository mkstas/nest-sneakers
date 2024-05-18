import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from '../clients/clients.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clientsService: ClientsService,
  ) {}

  async create(dto: CreateOrderDto) {
    const client = await this.clientsService.create({ phoneNumber: dto.phoneNumber });
    const order = await this.prismaService.order.create({
      data: {
        clientId: client.id,
      },
    });
    const data = dto.goods.map(good => ({ orderId: order.id, goodId: good.id }));
    await this.prismaService.orderGood.createMany({ data });
    return { success: true };
  }
}
