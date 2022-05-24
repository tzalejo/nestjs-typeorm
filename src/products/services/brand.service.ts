import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newbrand = this.brandRepository.create(data);
    return await this.brandRepository.save(newbrand);
  }

  async update(id: number, brandUpdate: UpdateBrandDto) {
    const brandFind = await this.brandRepository.findOne(id);
    this.brandRepository.merge(brandFind, brandUpdate);
    return this.brandRepository.save(brandFind);
  }

  async remove(id: number) {
    const brandDelete = await this.brandRepository.findOne(id);
    console.log(brandDelete);
    return this.brandRepository.delete(brandDelete['id']);
  }
}
