import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { BrandsService } from './brand.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['brand'],
    });
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
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, productUpdate: UpdateProductDto) {
    const productFind = await this.productRepository.findOne(id);
    if (productUpdate.brandId) {
      const brand = await this.brandsService.findOne(productUpdate.brandId);
      productFind.brand = brand;
    }

    this.productRepository.merge(productFind, productUpdate);
    return this.productRepository.save(productFind);
  }

  async remove(id: number) {
    const productDelete = await this.productRepository.findOne(id);
    console.log(productDelete);
    return this.productRepository.delete(productDelete['id']);
  }
}
