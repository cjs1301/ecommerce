import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class GetProductsQueryDto {
    @ApiProperty({
        isArray: true,
        required: false,
        description: 'normal, personalized, bundle',
        type: ProductType,
    })
    @Transform(({ value }) => {
        return Array.isArray(value)
            ? value
            : value.split(',').map((v: string) => v.trim());
    })
    @IsEnum(ProductType, { each: true })
    @IsOptional()
    type?: ProductType[] = ['normal', 'personalized', 'bundle'];
}
