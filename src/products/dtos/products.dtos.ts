import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'product name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
