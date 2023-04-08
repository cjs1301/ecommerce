import { ApiProperty } from '@nestjs/swagger';

export class Option {
    id: string;
    productId: string;
    @ApiProperty({ example: '용량', required: true })
    name: string;
}
