import { ApiResponseProperty } from '@nestjs/swagger';

export class FulfillmentRes {
    @ApiResponseProperty()
    trackingCompany: string;

    @ApiResponseProperty()
    trackingUid: string;

    @ApiResponseProperty()
    trackingUrl?: string;
}
