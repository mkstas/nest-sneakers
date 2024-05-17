import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
