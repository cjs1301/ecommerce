import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCartItemOption {
    @ApiProperty({
        description: '수정하고자 하는 옵션 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: '옵션 카테고리명에 해당하는 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: false,
    })
    @IsString()
    @IsOptional()
    productOptionId?: string;

    @ApiProperty({
        description: '옵션 값에 해당하는 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: false,
    })
    @IsString()
    @IsOptional()
    variantId?: string;
}
