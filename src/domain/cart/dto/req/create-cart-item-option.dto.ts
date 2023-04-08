import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCartItemOption {
    @ApiProperty({
        description: '옵션 카테고리명에 해당하는 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    productOptionId: string;

    @ApiProperty({
        description: '옵션 값에 해당하는 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    variantId: string;
}
