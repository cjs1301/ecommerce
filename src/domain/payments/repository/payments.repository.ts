import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { OrderStatus } from '@prisma/client';
import { UpdatePayment } from '../dto/update-payment.dto';

@Injectable()
export class PaymentsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async OrdersFindByIdAndUpdate(
        orderId: string,
        amount: number,
        status: OrderStatus,
    ) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: status,
                payment: {
                    create: {
                        amount: amount,
                    },
                },
            },
        });
    }

    async OrdersFindById(orderId: string) {
        return this.prisma.order.findUniqueOrThrow({
            where: {
                id: orderId,
            },
            include: {
                payment: true,
            },
        });
    }

    async OrderPaymentUpdate(
        orderId: string,
        orderStatus: OrderStatus,
        updatePayment: UpdatePayment,
    ) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: orderStatus,
                payment: {
                    update: {
                        paidAt: new Date(updatePayment.paid_at),
                    },
                },
            },
        });
    }

    async createTransaction(
        orderId: string,
        transaction: { paid: number; cancelled: number; refunded: number },
    ) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                transactions: {
                    create: transaction,
                },
            },
        });
    }

    async pointRollback(customerId: string, point: number) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                point: { increment: point },
                pointTransactions: {
                    create: {
                        point: point,
                        type: 'cancellation',
                    },
                },
            },
        });
    }

    async findByCustomerIdAndUpdate(
        customerId: string,
        { vbank_num, vbank_date, vbank_name },
    ) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: {
                vbank: {
                    upsert: {
                        update: {
                            number: vbank_num,
                            date: vbank_date,
                            name: vbank_name,
                        },
                        create: {
                            number: vbank_num,
                            date: vbank_date,
                            name: vbank_name,
                        },
                    },
                },
            },
        });
    }
}
