import { ApiProperty } from '@nestjs/swagger';

export class OrderBundleItemProductResDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    meta: string;
}
