import { ApiProperty } from '@nestjs/swagger';

export class BrandResDto {
    @ApiProperty()
    name: string;
}
