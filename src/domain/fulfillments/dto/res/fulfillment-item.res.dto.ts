import { ApiProperty } from '@nestjs/swagger';

interface BundleItems {
    product?: {
        name: string | null;
        meta?: any;
    };
    quantity: number;
}
interface Product {
    name: string | null;
}
interface Option {
    variant: {
        value: string;
    };
}

export class FulfillmentItemResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    orderId: string;
    @ApiProperty({
        example: {
            name: '화장품',
        },
        required: false,
    })
    product?: Product | null;
    @ApiProperty({
        example: [
            {
                product: {
                    name: '베이스',
                    meta: {},
                },
                quantity: 2,
            },
            {
                product: {
                    name: '샷',
                    meta: {},
                },
                quantity: 1,
            },
        ],
        required: false,
    })
    bundleItems?: BundleItems[];
    @ApiProperty({
        example: [
            {
                variant: {
                    value: '50ml',
                },
            },
            {
                variant: {
                    value: '사은품 없음',
                },
            },
        ],
        required: false,
    })
    options?: Option[];
    @ApiProperty()
    quantity: number;
}
