import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, FindConditions, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { BrandsService } from './brand.service';

import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    const { limit, offset, maxPrice, minPrice } = params;
    const where: FindConditions<Product> = {};

    if (maxPrice && minPrice) {
      where.price = Between(minPrice, maxPrice);
    }

    if (maxPrice && !minPrice) {
      where.price = LessThanOrEqual(maxPrice);
    }

    if (!maxPrice && minPrice) {
      where.price = MoreThanOrEqual(minPrice);
    }

    if (params) {
      return await this.productRepository.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
        where,
      });
    }
    return await this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(
        data.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, productUpdate: UpdateProductDto) {
    const productFind = await this.productRepository.findOne(id);
    if (productUpdate.brandId) {
      const brand = await this.brandRepository.findOne(productUpdate.brandId);
      productFind.brand = brand;
    }

    this.productRepository.merge(productFind, productUpdate);
    return this.productRepository.save(productFind);
  }

  async remove(id: number) {
    const productDelete = await this.productRepository.findOne(id);
    return this.productRepository.delete(productDelete['id']);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });

    const category = await this.categoryRepository.findOne(categoryId);
    product.categories.push(category);

    return this.productRepository.save(product);
  }
}
