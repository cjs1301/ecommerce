import { Customer } from '../../customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Vbank } from '../../../../payments/vbank.entity';
export class CustomerResDto extends Customer {
    @ApiProperty({ type: Vbank, required: false })
    vbank?: Vbank;
}
