import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentComplete } from '../dto/payment-complete.dto';
import { PaymentsService } from '../services/payments.service';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('결제')
@Controller('iamport-webhook')
export class ImpWebhookController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    async iamportCompleteWebhook(
        @Body() body: PaymentComplete,
        @RealIP() ip: string,
    ) {
        switch (ip) {
            case '52.78.100.19':
                return this.paymentsService.paymentComplete(body);
            case '52.78.48.223':
                return this.paymentsService.paymentComplete(body);
            case '52.78.5.241':
                return;
            default:
                throw new ForbiddenException('허가되가 되지 않은 ip입니다');
        }
    }
}
