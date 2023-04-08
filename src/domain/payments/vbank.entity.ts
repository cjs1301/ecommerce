import { ApiProperty } from '@nestjs/swagger';

export class Vbank {
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    number: number;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
