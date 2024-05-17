import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GoodsModule } from './core/goods/goods.module';

@Module({
  imports: [PrismaModule, GoodsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
