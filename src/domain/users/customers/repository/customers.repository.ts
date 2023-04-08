import { Injectable } from '@nestjs/common';
import { OauthUser, PassportUser } from '@application/auth/dto/auth.interface';
import { PrismaService } from '../../../../infrastructure/database/prisma.service';
import { CreateAddress } from '../dto/req/create-address.dto';
import { UpdateCustomer } from '../dto/req/update-customer.dto';
import { UpdateAddress } from '../dto/req/update-address.dto';
import { CustomerIncludeOption } from '../dto/req/query-customer.dto';

@Injectable()
export class CustomersRepository {
    constructor(private prisma: PrismaService) {}

    async findOneById(id: string, includeOption: CustomerIncludeOption) {
        try {
            const include =
                Object.keys(includeOption).length === 0 ? null : includeOption;
            return this.prisma.customer.findUnique({
                where: { id: id },
                include,
            });
        } catch (e) {
            throw e;
        }
    }

    async findOneByOauthId(oauthId: string) {
        const findMap = Object.create({
            kakao: { kakaoId: oauthId },
            naver: { naverId: oauthId },
            apple: { appleId: oauthId },
            google: { googleId: oauthId },
        });
        const whereObj = findMap[oauthId.split('_')[0]];
        return this.prisma.customer.findFirst({
            where: whereObj,
        });
    }

    async createCustomer(data: OauthUser) {
        try {
            const createMap = Object.create({
                kakao: {
                    kakaoId: data.oauthId,
                    name: data.name,
                    email: data.email,
                },
                naver: {
                    naverId: data.oauthId,
                    name: data.name,
                    email: data.email,
                },
                apple: {
                    appleId: data.oauthId,
                    name: data.name,
                    email: data.email,
                },
                google: {
                    googleId: data.oauthId,
                    name: data.name,
                    email: data.email,
                },
            });
            return this.prisma.customer.create({
                data: createMap[data.oauthId.split('_')[0]],
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteCustomer(customerId: string) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                isActive: false,
            },
        });
    }
    /**
     * @Param customerId
     * */
    async updateCustomer(customerId: string, data: UpdateCustomer) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                ...data,
            },
        });
    }

    async createAddress(customerId: string, data: CreateAddress) {
        return this.prisma.address.create({
            data: {
                customerId: customerId,
                ...data,
            },
        });
    }

    async updatePrimaryOffAllAddress(customerId: string) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                address: {
                    updateMany: {
                        where: { isPrimary: true },
                        data: { isPrimary: false },
                    },
                },
            },
            select: { address: true },
        });
    }

    async updateAddress(addressId: string, data: UpdateAddress) {
        return this.prisma.address.update({
            where: { id: addressId },
            data: {
                ...data,
            },
        });
    }

    async deleteAddress(addressId: string) {
        return this.prisma.address.delete({
            where: { id: addressId },
        });
    }

    async findAllAddress(customerId: string) {
        return this.prisma.address.findMany({
            where: { id: customerId },
        });
    }

    async findAllCustomers() {
        return this.prisma.customer.findMany();
    }
}
