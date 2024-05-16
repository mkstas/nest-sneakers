import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';
import { UpdateGoodDto } from './dto/update-good.dto';

@Injectable()
export class GoodsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateGoodDto, image: Express.Multer.File) {
    const fileName = await this.fileService.storeFile(image);
    const good = await this.prismaService.good.create({
      data: { title: dto.title, price: Number(dto.price), image: fileName },
    });
    return good;
  }

  async findAll() {
    const goods = await this.prismaService.good.findMany();
    if (goods.length < 1) throw new NotFoundException();
    return goods;
  }

  async findOne(id: number) {
    const good = await this.prismaService.good.findUnique({ where: { id } });
    if (!good) throw new NotFoundException();
    return good;
  }

  async findBySearch(searchString: any) {
    const goods = await this.prismaService.good.findMany({
      where: { title: { mode: 'insensitive', contains: searchString } },
    });
    if (goods.length < 1) throw new NotFoundException();
    return goods;
  }

  async update(id: number, dto: UpdateGoodDto, image: Express.Multer.File) {
    const good = await this.findOne(id);
    let data = {};

    if (dto.title) data = { title: dto.title };
    if (dto.price) data = { ...data, price: Number(dto.price) };

    if (image) {
      await this.fileService.removeFile(good.image);
      const fileName = await this.fileService.storeFile(image);
      data = { ...data, image: fileName };
    }

    const updatedGood = await this.prismaService.good.update({ where: { id }, data });
    return updatedGood;
  }

  async remove(id: number) {
    const good = await this.findOne(1);
    await this.fileService.removeFile(good.image);
    await this.prismaService.good.delete({ where: { id } });
    return { success: true };
  }
}
