import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoodsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateGoodDto, image: Express.Multer.File) {
    const good = await this.prismaService.good.create({
      data: {
        title: dto.title,
        price: Number(dto.price),
        image: image.filename,
      },
    });
    return good;
  }

  async findAll() {
    const goods = await this.prismaService.good.findMany();
    if (goods.length < 0) throw new NotFoundException();
    return goods;
  }

  async findOne(id: number) {
    const good = await this.prismaService.good.findUnique({ where: { id } });
    if (!good) throw new NotFoundException();
    return good;
  }

  async findBySearch(searchString: string) {
    const goods = await this.prismaService.good.findMany({
      where: {
        title: {
          mode: 'insensitive',
          contains: searchString,
        },
      },
    });
    if (goods.length < 0) throw new NotFoundException();
    return goods;
  }

  async update(id: number, dto: UpdateGoodDto, image: Express.Multer.File) {
    const good = await this.findOne(id);

    const updatedGood = await this.prismaService.good.update({
      where: { id },
      data: { ...dto, image: image && image.filename },
    });
    return updatedGood;
  }

  async remove(id: number) {
    const good = await this.findOne(id);
    await this.prismaService.good.delete({ where: { id } });
    return { success: true };
  }
}
