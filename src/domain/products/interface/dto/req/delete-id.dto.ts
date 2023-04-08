import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteId {
    @ApiProperty()
    @IsString()
    id: string;
}
