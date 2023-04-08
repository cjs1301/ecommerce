import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBundleItemDto {
    @ApiProperty({ example: '추가할 상품의 아이디', required: true })
    @IsString()
    productId: string;
}

export class UpdateBundleItemDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ example: '추가할 상품의 아이디', required: true })
    @IsString()
    productId: string;
}
