import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsService } from './../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private customerService: CustomersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepository.save(newUser);
  }

  async update(id: number, userUpdate: UpdateUserDto) {
    const userFind = await this.userRepository.findOne(id);
    this.userRepository.merge(userFind, userUpdate);
    return this.userRepository.save(userFind);
  }

  async remove(id: number) {
    const userDelete = await this.userRepository.findOne(id);
    if (!userDelete) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.delete(userDelete['id']);
  }

  async getOrderByUser(id: number) {
    const user = this.userRepository.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
