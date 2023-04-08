import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePersonalizedProductDto {
    @ApiProperty()
    @IsNumber()
    elasticityScore: number;
    @ApiProperty()
    @IsNumber()
    breakoutScore: number;
    @ApiProperty()
    @IsNumber()
    sensitivityScore: number;
    @ApiProperty()
    @IsNumber()
    agingScore: number;
    @ApiProperty()
    @IsNumber()
    dehydrationScore: number;
    @ApiProperty()
    @IsNumber()
    odorScore: number;
    @ApiProperty()
    @IsNumber()
    darknessScore: number;
    @ApiProperty()
    @IsNumber()
    deadSkinScore: number;
    @ApiProperty()
    @IsNumber()
    recoveryScore: number;
    @ApiProperty()
    @IsNumber()
    itchyScore: number;
    @ApiProperty()
    @IsNumber()
    baseScore: number;
}
