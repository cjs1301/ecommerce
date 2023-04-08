import { ApiProperty } from '@nestjs/swagger';

export class CategoryResDto {
    @ApiProperty()
    name: string;
    @ApiProperty({ required: true })
    description: string | null;
}
