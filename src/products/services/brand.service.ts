import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.brandRepository.create(data);
    return await this.brandRepository.save(newProduct);
  }

  async update(id: number, productUpdate: UpdateProductDto) {
    const productFind = await this.brandRepository.findOne(id);
    this.brandRepository.merge(productFind, productUpdate);
    return this.brandRepository.save(productFind);
  }

  async remove(id: number) {
    const productDelete = await this.brandRepository.findOne(id);
    console.log(productDelete);
    return this.brandRepository.delete(productDelete['id']);
  }
}
