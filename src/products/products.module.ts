import { Module } from '@nestjs/common';

import {ProductsController } from './controllers/products.controller';
import {CategoriesController} from './controllers/categories.controller';
import {ProductsService} from './services/products.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers:[ProductsController, CategoriesController],
  providers:[ProductsService],
  exports:[ProductsService]

})
export class ProductsModule {}
