import { ApiProperty } from '@nestjs/swagger';

export class UploadResDto {
    @ApiProperty()
    data: string;
}
