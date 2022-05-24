import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(newCustomer: CreateCustomerDto) {
    const customer = this.customerRepository.create(newCustomer);
    return await this.customerRepository.save(customer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne(id);
    this.customerRepository.merge(customer, changes);
    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return this.customerRepository.delete(customer['id']);
  }
}
