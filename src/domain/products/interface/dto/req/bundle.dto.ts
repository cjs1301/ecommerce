import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { UpdateBundleItemDto, CreateBundleItemDto } from './bundleItem.dto';

export class CreateBundleDto {
    @ApiProperty({ example: '샷 1', required: true })
    @IsString()
    name: string;
    @ApiProperty({ example: 'true 필수 여부', required: true })
    @IsBoolean()
    required: boolean;
    @ApiProperty({ type: [CreateBundleItemDto] })
    @IsArray()
    @IsOptional()
    items: CreateBundleItemDto[];
}

export class UpdateBundleDto {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsBoolean()
    required: boolean;
    @ApiProperty({ type: [UpdateBundleItemDto] })
    @IsArray()
    @IsOptional()
    items: UpdateBundleItemDto[];
}
