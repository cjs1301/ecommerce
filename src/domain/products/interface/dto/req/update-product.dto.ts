import { DiscountType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { UpdateOptionDto } from './update-option.dto';
import { UpdateBundleDto } from './bundle.dto';
import { DeleteId } from './delete-id.dto';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateProductDto {
    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @ApiProperty({
        example:
            'https://actibiome-image.s3.ap-northeast-2.amazonaws.com/products/images/1670393090850+-+actibiome_product_1.png',
        required: false,
    })
    @IsString()
    @IsOptional()
    thumbnail?: string;

    @ApiProperty({ example: '맞춤형 화장품', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: '1:1 맞춤형 화장품', required: false })
    @IsString()
    @IsOptional()
    summary?: string;

    @ApiProperty({
        example:
            '<p>세계 최초 특허 상품입니다. 지금 바로 개인만의 화장품을 만들어 보세요</p>',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: '#바이오 #맞춤형화장품 (현재 사용X)',
        required: false,
    })
    @IsString()
    @IsOptional()
    keywords?: string;

    @ApiProperty({ example: 75000, required: false })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 'percentage(%) | fixed(고정값)',
        enum: DiscountType,
        required: false,
    })
    @IsEnum(DiscountType)
    @IsOptional()
    discountType?: DiscountType;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    discountValue?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    quantity?: number;

    @ApiProperty({ example: '브랜드 이름', required: false })
    @IsString()
    @IsOptional()
    brand: string;

    @ApiProperty({ example: null, required: false })
    @IsBoolean()
    @IsOptional()
    isStandard?: boolean | null;

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
    categories?: CreateCategoryDto[];

    @ApiProperty({ type: [UpdateOptionDto], required: false })
    @IsArray()
    @IsOptional()
    options?: UpdateOptionDto[];

    @ApiProperty({ type: [UpdateBundleDto], required: false })
    @IsArray()
    @IsOptional()
    bundles?: UpdateBundleDto[];

    @ApiProperty({ type: [DeleteId], required: false })
    @IsArray()
    @IsOptional()
    deleteOptions?: DeleteId[];

    @ApiProperty({ type: [DeleteId], required: false })
    @IsArray()
    @IsOptional()
    deleteVariations?: DeleteId[];

    @ApiProperty({ type: [DeleteId], required: false })
    @IsArray()
    @IsOptional()
    deleteBundles?: DeleteId[];

    @ApiProperty({ type: [DeleteId], required: false })
    @IsArray()
    @IsOptional()
    deleteBundleItems?: DeleteId[];

    @ApiProperty({ required: false })
    @IsOptional()
    // @IsJSON()
    meta?: any;
}
