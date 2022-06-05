import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['orderProducts', 'orderProducts.product'],
    });
    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order(); // como no tengo valores por enviar, solo customerId
    if (data.customerId) {
      const customer = await this.customerRepository.findOne(data.customerId);
      newOrder.customer = customer;
    }
    return await this.orderRepository.save(newOrder);
  }

  async update(id: number, orderUpdate: UpdateOrderDto) {
    const orderFind = await this.orderRepository.findOne(id);
    if (orderUpdate.customerId) {
      const customer = await this.customerRepository.findOne(
        orderUpdate.customerId,
      );
      orderFind.customer = customer;
    }
    return this.orderRepository.save(orderFind);
  }

  async remove(id: number) {
    const orderDelete = await this.orderRepository.findOne(id);
    if (!orderDelete) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return this.orderRepository.delete(id);
  }
}
