import { ApiProperty } from '@nestjs/swagger';
import { DiscountType } from '@prisma/client';
import { BrandResDto } from './brand.res.dto';
import { OptionResDto } from './option.res.dto';
import { BundleResDto } from './bundle.res.dto';
import { CategoryResDto } from './category.res.dto';

export class GetProductResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({
        example:
            'https://actibiome-image.s3.ap-northeast-2.amazonaws.com/products/images/1670393090850+-+actibiome_product_1.png',
        required: false,
    })
    thumbnail: string | null;
    @ApiProperty({ required: true })
    available: boolean;
    @ApiProperty({ example: '맞춤형 화장품', required: true })
    name: string;
    @ApiProperty({ example: '1:1 맞춤형 화장품', required: false })
    summary: string | null;
    @ApiProperty({
        example:
            '<p>세계 최초 특허 상품입니다. 지금 바로 개인만의 화장품을 만들어 보세요</p>',
        required: false,
    })
    description: string | null;
    @ApiProperty({
        example: '#바이오 #맞춤형화장품 (현재 사용X)',
        required: false,
    })
    keywords: string | null;
    @ApiProperty({ example: 75000, required: true })
    price: number;
    @ApiProperty({
        example: 'percentage(%) | fixed(고정값)',
        enum: DiscountType,
        required: false,
    })
    discountType?: DiscountType | null;
    @ApiProperty({ required: false })
    discountValue?: number | null;
    @ApiProperty({ example: '100' })
    quantity: number;

    @ApiProperty({
        example: [
            { name: '맨즈 케어', description: '대분류' },
            { name: '헤어 용품', description: '중분류' },
            { name: '샴푸', description: '소분류' },
        ],
        type: [CategoryResDto],
        required: false,
    })
    categories?: CategoryResDto[];

    @ApiProperty({ type: BrandResDto, required: false })
    brand?: BrandResDto | null;

    @ApiProperty({ required: false })
    meta?: any | null;

    @ApiProperty({ type: [OptionResDto], required: false })
    options?: OptionResDto[];
    @ApiProperty({ type: [BundleResDto], required: false })
    bundles?: BundleResDto[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty({ required: false })
    deleted: boolean;
}
