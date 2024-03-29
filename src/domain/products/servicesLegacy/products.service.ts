import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepositoryLegacy } from '../infra/db/repositoryLegacy/products.repository.legacy';
import { UpdateProductDto } from '../interface/dto/req/update-product.dto';
import { CreateProductDto } from '../interface/dto/req/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('ProductsRepositoryLegacy')
        private readonly productsRepository: ProductsRepositoryLegacy,
    ) {}

    async createProduct(data: CreateProductDto) {
        return await this.productsRepository.create(data);
    }
    async getAll() {
        return this.productsRepository.findAll();
    }

    async delete(productId: string) {
        return this.productsRepository.delete(productId);
    }

    async getOne(productId: string) {
        return this.productsRepository.findOne(productId);
    }
    async update(productId: string, body: UpdateProductDto) {
        return this.productsRepository.update(productId, body);
    }
}
