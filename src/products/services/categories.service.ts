import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/category.dtos';
import { UpdateProductDto } from '../dtos/products.dtos';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({
      // relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newcategory = this.categoryRepository.create(data);
    /* if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newcategory.brand = brand;
    } */
    return this.categoryRepository.save(newcategory);
  }

  async update(id: number, categoryUpdate: UpdateProductDto) {
    const categoryFind = await this.categoryRepository.findOne(id);
    /* if (categoryUpdate.brandId) {
      const brand = await this.brandsService.findOne(categoryUpdate.brandId);
      categoryFind.brand = brand;
    } */

    this.categoryRepository.merge(categoryFind, categoryUpdate);
    return this.categoryRepository.save(categoryFind);
  }

  async remove(id: number) {
    const categoryDelete = await this.categoryRepository.findOne(id);
    return this.categoryRepository.delete(categoryDelete['id']);
  }
}
