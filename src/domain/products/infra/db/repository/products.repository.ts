import { IProductsRepository } from '../../../domain/repository/iproducts.repository';
import { PrismaService } from '../../../../../infrastructure/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProductResDto } from '../../../interface/dto/res/get-product.res.dto';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(private prisma: PrismaService) {}

    async findUnique(productId: string): Promise<GetProductResDto> {
        return this.prisma.product.findUniqueOrThrow({
            where: {
                id: productId,
            },
            include: {
                bundles: {
                    select: {
                        id: true,
                        name: true,
                        required: true,
                        items: {
                            select: {
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        summary: true,
                                        available: true,
                                        price: true,
                                        quantity: true,
                                    },
                                },
                            },
                        },
                    },
                },
                brand: true,
                categories: true,
            },
        });
    }
}
