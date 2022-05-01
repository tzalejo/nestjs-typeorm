import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    return await this.productRepository.save(newProduct);
  }

  async update(id: number, productUpdate: UpdateProductDto) {
    const productFind = await this.productRepository.findOne(id);
    this.productRepository.merge(productFind, productUpdate);
    return this.productRepository.save(productFind);
  }

  async remove(id: number) {
    const productDelete = await this.findOne(id);
    console.log(productDelete);
    return this.productRepository.delete(productDelete['id']);
  }
}
