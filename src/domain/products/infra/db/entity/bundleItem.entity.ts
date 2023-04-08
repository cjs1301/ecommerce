import { ApiProperty } from '@nestjs/swagger';

export class BundleItem {
    id: string;
    bundleId: string;
    parentProductId: string;
}
