import { ApiProperty } from '@nestjs/swagger';
import { CartOnProduct } from './cartOnProduct.entity';

export class Cart {
    @ApiProperty()
    id: string;
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    items?: CartOnProduct[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
