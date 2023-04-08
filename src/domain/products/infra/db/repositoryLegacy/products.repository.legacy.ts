import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { UpdateProductDto } from '../../../interface/dto/req/update-product.dto';
import { CreateProductDto } from '../../../interface/dto/req/create-product.dto';
import cuid from 'cuid';
import { GetProductsQueryDto } from '../../../interface/dto/req/get-products.query.dto';
import { GetProductResDto } from '../../../interface/dto/res/get-product.res.dto';
import { GetProductsResDto } from '../../../interface/dto/res/get-products.res.dto';

@Injectable()
export class ProductsRepositoryLegacy {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateProductDto) /*: Promise<GetProductResDto>*/ {
        try {
            const productId = cuid();
            return this.prisma.product.create({
                data: {
                    ...data,
                    id: productId,
                    brand: data.brand
                        ? {
                              connectOrCreate: {
                                  where: { name: data.brand },
                                  create: {
                                      name: data.brand,
                                  },
                              },
                          }
                        : {},
                    categories:
                        data.categories && data.categories.length !== 0
                            ? {
                                  connectOrCreate: data.categories.map(
                                      (category) => {
                                          return {
                                              where: {
                                                  name: category.name,
                                              },
                                              create: {
                                                  ...category,
                                              },
                                          };
                                      },
                                  ),
                              }
                            : {},
                    // options
                    options:
                        data.options && data.options.length !== 0
                            ? {
                                  create: data.options?.map((el) => {
                                      return {
                                          name: el.name,
                                          variations: {
                                              create: el.variations.map((x) => {
                                                  return {
                                                      value: x.value,
                                                      productId,
                                                  };
                                              }),
                                          },
                                      };
                                  }),
                              }
                            : {},
                    // bundles
                    bundles:
                        data.bundles && data.bundles.length !== 0
                            ? {
                                  create: data.bundles?.map((el) => {
                                      return {
                                          name: el.name,
                                          required: el.required,
                                          items: {
                                              create: el.items.map((x) => {
                                                  return {
                                                      productId: x.productId,
                                                      parentProductId:
                                                          productId,
                                                  };
                                              }),
                                          },
                                      };
                                  }),
                              }
                            : {},
                },
                select: {
                    id: true,
                    type: true,
                    thumbnail: true,
                    available: true,
                    name: true,
                    summary: true,
                    description: true,
                    keywords: true,
                    price: true,
                    discountType: true,
                    discountValue: true,
                    quantity: true,
                    options: {
                        select: {
                            id: true,
                            name: true,
                            variations: {
                                select: {
                                    id: true,
                                    value: true,
                                },
                            },
                        },
                    },
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
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                    categories: {
                        select: {
                            name: true,
                            description: true,
                        },
                    },
                    meta: true,
                    isStandard: true,
                    createdAt: true,
                    updatedAt: true,
                    deleted: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }
    async findAll(query: GetProductsQueryDto): Promise<GetProductsResDto[]> {
        return this.prisma.product.findMany({
            where: {
                type: {
                    in: query.type,
                },
            },
            select: {
                id: true,
                type: true,
                available: true,
                thumbnail: true,
                name: true,
                summary: true,
                brand: true,
                description: true,
                keywords: true,
                price: true,
                discountType: true,
                discountValue: true,
                quantity: true,
                options: {
                    select: {
                        id: true,
                        name: true,
                        variations: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                    },
                },
                bundles: {
                    select: {
                        id: true,
                        name: true,
                        required: true,
                        items: {
                            select: {
                                id: true,
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
                isStandard: true,
                meta: true,
                categories: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
                deleted: true,
            },
        });
    }
    async delete(productId: string) {
        return this.prisma.product.delete({ where: { id: productId } });
    }
    async findOne(productId: string) /*: Promise<GetProductResDto>*/ {
        return this.prisma.product.findUnique({
            where: { id: productId },
            select: {
                id: true,
                type: true,
                available: true,
                thumbnail: true,
                name: true,
                summary: true,
                brand: true,
                description: true,
                keywords: true,
                price: true,
                discountType: true,
                discountValue: true,
                quantity: true,
                options: {
                    select: {
                        id: true,
                        name: true,
                        variations: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                    },
                },
                bundles: {
                    select: {
                        id: true,
                        name: true,
                        required: true,
                        items: {
                            select: {
                                id: true,
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
                isStandard: true,
                meta: true,
                categories: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
                deleted: true,
            },
        });
    }
    async update(
        productId: string,
        data: UpdateProductDto,
    ) /*: Promise<GetProductResDto>*/ {
        try {
            //-----------------------------
            return this.prisma.product.update({
                where: { id: productId },
                data: {
                    ...data,
                    categories:
                        data.categories && data.categories.length !== 0
                            ? {
                                  upsert: data.categories.map((category) => {
                                      return {
                                          where: {
                                              name: category.name,
                                          },
                                          update: {
                                              description:
                                                  category.description || '',
                                          },
                                          create: {
                                              ...category,
                                          },
                                      };
                                  }),
                              }
                            : {},
                    brand: data.brand
                        ? {
                              connectOrCreate: {
                                  where: {
                                      name: data.brand,
                                  },
                                  create: {
                                      name: data.brand,
                                  },
                              },
                          }
                        : {},
                    options: data.options
                        ? {
                              deleteMany: data.deleteOptions,
                              upsert: data.options?.map((el) => {
                                  // options
                                  return {
                                      where: { id: el.id },
                                      update: {
                                          name: el.name,
                                          variations: {
                                              deleteMany: data.deleteVariations,
                                              upsert: el.variations.map((x) => {
                                                  return {
                                                      where: { id: x.id },
                                                      update: {
                                                          value: x.value,
                                                      },
                                                      create: {
                                                          value: x.value,
                                                          productId,
                                                      },
                                                  };
                                              }),
                                          },
                                      },
                                      create: {
                                          name: el.name,
                                          variations: {
                                              create: el.variations.map((x) => {
                                                  return {
                                                      value: x.value,
                                                      productId,
                                                  };
                                              }),
                                          },
                                      },
                                  };
                              }),
                          }
                        : {},
                    bundles: data.bundles
                        ? {
                              deleteMany: data.deleteBundles,
                              upsert: data.bundles?.map((el) => {
                                  // bundles
                                  return {
                                      where: { id: el.id },
                                      update: {
                                          name: el.name,
                                          required: el.required,
                                          items: {
                                              deleteMany:
                                                  data.deleteBundleItems,
                                              upsert: el.items.map((x) => {
                                                  return {
                                                      where: { id: x.id },
                                                      update: {
                                                          productId:
                                                              x.productId,
                                                      },
                                                      create: {
                                                          productId:
                                                              x.productId,
                                                          parentProductId:
                                                              productId,
                                                      },
                                                  };
                                              }),
                                          },
                                      },
                                      create: {
                                          name: el.name,
                                          required: el.required,
                                          items: {
                                              create: el.items.map((x) => {
                                                  return {
                                                      productId: x.productId,
                                                      parentProductId:
                                                          productId,
                                                  };
                                              }),
                                          },
                                      },
                                  };
                              }),
                          }
                        : {},
                },
                select: {
                    id: true,
                    type: true,
                    available: true,
                    thumbnail: true,
                    name: true,
                    summary: true,
                    brand: true,
                    description: true,
                    keywords: true,
                    price: true,
                    discountType: true,
                    discountValue: true,
                    quantity: true,
                    options: {
                        select: {
                            id: true,
                            name: true,
                            variations: {
                                select: {
                                    id: true,
                                    value: true,
                                },
                            },
                        },
                    },
                    bundles: {
                        select: {
                            id: true,
                            name: true,
                            required: true,
                            items: {
                                select: {
                                    id: true,
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
                    isStandard: true,
                    meta: true,
                    categories: true,
                    createdAt: true,
                    updatedAt: true,
                    deleted: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteBundle(bundleId: string) {
        return this.prisma.bundle.delete({ where: { id: bundleId } });
    }
}
