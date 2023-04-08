import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentComplete } from '../dto/payment-complete.dto';
import { PaymentsService } from '../services/payments.service';

@ApiTags('결제')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post('complete')
    async paymentComplete(@Body() body: PaymentComplete) {
        return this.paymentsService.paymentComplete(body);
    }
}
