import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
