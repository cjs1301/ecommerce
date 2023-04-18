import { Injectable } from '@nestjs/common';

import { AdminUsersRepository } from './admin-users.repository';
import { AdminLoginDto } from '../../../application/auth/dto/admin-login.dto';
import { CreateAdminDto } from '../../../application/auth/dto/create-admin.dto';

@Injectable()
export class AdminUsersService {
    constructor(private readonly adminRepository: AdminUsersRepository) {}

    async findById(id: string) {
        return await this.adminRepository.findAdminById(id);
    }
    async login({ email, password }: AdminLoginDto) {
        return await this.adminRepository.findAdminbyEmailAndPassword({
            email,
            password,
        });
    }

    async signUp(data: CreateAdminDto) {
        return this.adminRepository.createAdmin(data);
    }
}
