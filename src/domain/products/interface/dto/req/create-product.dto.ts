import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsJSON,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { CreateOptionDto } from './create-option.dto';
import { CreateBundleDto } from './bundle.dto';
import { DiscountType } from '@prisma/client';
import { CreateCategoryDto } from './create-category.dto';

export class CreateProductDto {
    @ApiProperty({
        example:
            'https://actibiome-image.s3.ap-northeast-2.amazonaws.com/products/images/1670393090850+-+actibiome_product_1.png',
        required: false,
    })
    @IsOptional()
    @IsString()
    thumbnail: string | null;

    @ApiProperty({ required: true })
    @IsBoolean()
    available: boolean;

    @ApiProperty({ example: '맞춤형 화장품', required: true })
    @IsString()
    name: string;

    @ApiProperty({ example: '1:1 맞춤형 화장품', required: false })
    @IsOptional()
    @IsString()
    summary: string | null;

    @ApiProperty({
        example:
            '<p>세계 최초 특허 상품입니다. 지금 바로 개인만의 화장품을 만들어 보세요</p>',
        required: false,
    })
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty({
        example: '#바이오 #맞춤형화장품 (현재 사용X)',
        required: false,
    })
    @IsOptional()
    @IsString()
    keywords: string | null;

    @ApiProperty({ example: 75000, required: true })
    @IsNumber()
    price: number;

    @ApiProperty({
        example: 'percentage(%) | fixed(고정값)',
        enum: DiscountType,
        required: false,
    })
    @IsOptional()
    @IsEnum(DiscountType)
    discountType: DiscountType | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    discountValue: number | null;

    @ApiProperty({ example: '100' })
    @IsOptional()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        example: [
            { name: '맨즈 케어', description: '대분류' },
            { name: '헤어 용품', description: '중분류' },
            { name: '샴푸', description: '소분류' },
        ],
        type: [CreateCategoryDto],
        required: false,
    })
    @IsOptional()
    @IsArray()
    categories: CreateCategoryDto[];

    @ApiProperty({ type: [CreateOptionDto], required: false })
    @IsOptional()
    @IsArray()
    options: CreateOptionDto[] = [];

    @ApiProperty({ type: [CreateBundleDto], required: false })
    @IsOptional()
    @IsArray()
    bundles: CreateBundleDto[] = [];

    @ApiProperty({ example: '브랜드 이름', required: false })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiProperty({ type: JSON, required: false })
    @IsJSON()
    @IsOptional()
    meta?: any;
}
