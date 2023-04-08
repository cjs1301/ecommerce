import { ApiProperty } from '@nestjs/swagger';

export class Variant {
    id: string;
    @ApiProperty()
    productId: string;
    @ApiProperty()
    optionId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: string;
}
