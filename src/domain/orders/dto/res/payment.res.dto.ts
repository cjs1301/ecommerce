import { ApiResponseProperty } from '@nestjs/swagger';

export class PaymentRes {
    @ApiResponseProperty()
    amount: number;
    @ApiResponseProperty()
    provider: string;
    @ApiResponseProperty()
    paidAt: Date;
}
