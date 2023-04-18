import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../repository/customers.repository';
import { UpdateCustomer } from '../dto/req/update-customer.dto';
import { OauthUser } from '../../../../application/auth/dto/auth.interface';
import { CreateAddress } from '../dto/req/create-address.dto';
import { UpdateAddress } from '../dto/req/update-address.dto';
import { CustomerIncludeOption } from '../dto/req/query-customer.dto';
@Injectable()
export class CustomersService {
    constructor(private customersRepository: CustomersRepository) {}

    async create(oauthUser: OauthUser) {
        return this.customersRepository.createCustomer(oauthUser);
    }

    async findOneCustomerByOauthId(oauthId: string) {
        return this.customersRepository.findOneByOauthId(oauthId);
    }

    /**
     * @param {string} customerId
     * @param {string} include
     * */
    async getCustomer(customerId: string, include: CustomerIncludeOption) {
        const customer = await this.customersRepository.findOneByIdWithInclude(
            customerId,
            include,
        );

        if (!customer) {
            throw new BadRequestException(`${customerId}를 찾을 수 없습니다.`);
        }

        return customer;
    }

    async withdrawal(customerId: string) {
        return this.customersRepository.deleteCustomer(customerId);
    }

    async updateMe(userId: string, body: UpdateCustomer) {
        return this.customersRepository.updateCustomer(userId, body);
    }

    async getAddress(customerId: string) {
        return this.customersRepository.findAllAddress(customerId);
    }

    async createAddress(customerId: string, body: CreateAddress) {
        if (body.isPrimary) {
            await this.customersRepository.updatePrimaryOffAllAddress(
                customerId,
            );
        }
        return this.customersRepository.createAddress(customerId, body);
    }

    async updateAddress(
        customerId: string,
        addressId: string,
        body: UpdateAddress,
    ) {
        if (body.isPrimary) {
            await this.customersRepository.updatePrimaryOffAllAddress(
                customerId,
            );
        }
        return this.customersRepository.updateAddress(addressId, body);
    }

    async deleteAddress(addressId: string) {
        return this.customersRepository.deleteAddress(addressId);
    }

    async getCustomers() {
        return this.customersRepository.findAllCustomers();
    }

    async updateCustomer(customerId: string, body: UpdateCustomer) {
        return this.customersRepository.updateCustomer(customerId, body);
    }
}
