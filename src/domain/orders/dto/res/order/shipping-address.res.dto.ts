import { ApiProperty } from '@nestjs/swagger';

export class ShippingAdressResDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    postcode: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    address1: string;
    @ApiProperty()
    address2: string;
    @ApiProperty()
    mobile: string;
}
