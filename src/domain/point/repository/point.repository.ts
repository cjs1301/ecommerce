import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { PointTransactionType } from '@prisma/client';

@Injectable()
export class PointRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllPointTransaction(
        customerId: string,
        type: PointTransactionType,
    ) {
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );
        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
        );
        return this.prisma.pointTransaction.findMany({
            where: {
                customerId: customerId,
                type: type,
                createdAt: { gte: startOfDay, lt: endOfDay },
            },
        });
    }

    async incrementPoint(
        customerId: string,
        point: number,
        type: PointTransactionType,
    ) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                point: {
                    increment: point,
                },
                pointTransactions: {
                    create: {
                        point: point,
                        type: type,
                    },
                },
            },
        });
    }
    async createPointTransaction(
        tx: Omit<
            PrismaService,
            '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
        >,
        customerId: string,
        point: number,
        type: PointTransactionType,
    ) {
        return tx.customer.update({
            where: { id: customerId },
            data: {
                point:
                    type === 'used'
                        ? {
                              decrement: point,
                          }
                        : {
                              increment: point,
                          },
                pointTransactions: {
                    create: {
                        point: type === 'used' ? -point : point,
                        type: type,
                    },
                },
            },
        });
    }
}
