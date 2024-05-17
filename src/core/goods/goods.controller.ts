import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { imageStorage } from 'src/storages/image-storage';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  create(@Body() dto: CreateGoodDto, @UploadedFile() image: Express.Multer.File) {
    return this.goodsService.create(dto, image);
  }

  @Get()
  findAll(@Query() query: { search: string }) {
    if (query.search) return this.goodsService.findBySearch(query.search);
    return this.goodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGoodDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.goodsService.update(id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.remove(id);
  }
}
