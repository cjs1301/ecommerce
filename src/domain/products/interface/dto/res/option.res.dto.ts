import { ApiProperty } from '@nestjs/swagger';
import { VariantResDto } from './variant.res.dto';

export class OptionResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ example: '용량', required: true })
    name: string;
    @ApiProperty({ type: [VariantResDto] })
    variations: VariantResDto[];
}
