import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * @type {paid}
 * 결제가 승인되었을 때(모든 결제 수단) - (status : paid)
 * @type {ready}
 * 가상계좌가 발급되었을 때 - (status : ready)
 * @type {paid}
 * 가상계좌에 결제 금액이 입금되었을 때 - (status : paid)
 * @type {paid | failed}
 * 예약결제가 시도되었을 때 - (status : paid or failed)
 * @type {cancelled}
 * 관리자 콘솔에서 결제 취소되었을 때 - (status : cancelled)
 */
export interface IamportStatus {
    paid: 'paid';
    ready: 'ready';
    failed: 'failed';
    cancelled: 'cancelled';
}

export class PaymentComplete {
    @ApiProperty()
    @IsString()
    imp_uid: string;
    @ApiProperty()
    @IsString()
    merchant_uid: string;

    /**
     * @enum 'paid'
     * 결제가 승인되었을 때(모든 결제 수단) - (status : paid)
     * @type {ready}
     * 가상계좌가 발급되었을 때 - (status : ready)
     * @type {paid}
     * 가상계좌에 결제 금액이 입금되었을 때 - (status : paid)
     * @type {paid | failed}
     * 예약결제가 시도되었을 때 - (status : paid or failed)
     * @type {cancelled}
     * 관리자 콘솔에서 결제 취소되었을 때 - (status : cancelled)
     */
    @ApiProperty()
    @IsString()
    status: 'paid' | 'ready' | 'failed' | 'cancelled';
}
