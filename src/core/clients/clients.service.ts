import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateClientDto) {
    let client = await this.prismaService.client.findFirst({
      where: {
        phoneNumber: dto.phoneNumber,
      },
    });
    if (!client) {
      client = await this.prismaService.client.create({ data: { ...dto } });
    }
    return client;
  }
}
