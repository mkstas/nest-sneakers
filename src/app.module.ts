import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { GoodsModule } from './core/goods/goods.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
    }),
    PrismaModule,
    GoodsModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
