import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayment {
    provider?: string;
    paid_at: Date;
}
