import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { AdminLoginDto } from '../../../application/auth/dto/admin-login.dto';
import { CreateAdminDto } from '../../../application/auth/dto/create-admin.dto';
@Injectable()
export class AdminUsersRepository {
    constructor(private prisma: PrismaService) {}

    async findAdminById(id: string) {
        try {
            const { password: p, ...rest } =
                await this.prisma.admin.findUniqueOrThrow({
                    where: { id: id },
                });
            return rest;
        } catch (error) {
            throw error;
        }
    }

    async findAdminbyEmailAndPassword({ email, password }: AdminLoginDto) {
        const adminUser = await this.prisma.admin.findFirst({
            where: {
                email,
            },
        });
        if (!adminUser) {
            throw new HttpException(
                '해당 이메일로 유저를 찾을수 없음',
                HttpStatus.UNAUTHORIZED,
            );
        }
        // compare passwords
        const areEqual = await compare(password, adminUser.password);

        if (!areEqual) {
            throw new HttpException(
                '비밀번호가 다름니다',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return adminUser;
    }

    async deleteAdmin(AdminId: string) {
        return this.prisma.admin.update({
            where: { id: AdminId },
            data: {
                isActive: false,
            },
        });
    }

    async createAdmin(data: CreateAdminDto) {
        return this.prisma.admin.create({
            data: {
                email: data.email,
                name: data.name,
                password: await hash(data.password, 10),
                role: 'manager',
            },
        });
    }
}
