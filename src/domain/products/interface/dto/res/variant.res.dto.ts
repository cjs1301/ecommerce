import { ApiProperty } from '@nestjs/swagger';

export class VariantResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    value: string;
}
