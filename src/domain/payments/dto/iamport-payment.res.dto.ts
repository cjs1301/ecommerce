export class IamportPaymentResDto {
    amount: number;
    apply_num: string; // '47441593'
    bank_code?: string;
    bank_name?: string;
    buyer_addr: string; // address
    buyer_email: string;
    buyer_name: string;
    buyer_postcode: string; // '13562'
    buyer_tel: string; // '01031381106'
    cancel_amount: number;
    cancel_history: Array<any>;
    cancel_reason?: string;
    cancel_receipt_urls: Array<any>;
    cancelled_at: Date;
    card_code: string; // '365'
    card_name: string; // '삼성카드'
    card_number: string; // '*********'
    card_quota: number;
    card_type: number;
    cash_receipt_issued: boolean; // false,
    channel: string; // 'pc',
    currency: string; // 'KRW',
    custom_data?: any; // null,
    customer_uid?: string; // null,
    customer_uid_usage?: any; // null,
    emb_pg_provider?: string; // 'kakaopay',
    escrow: boolean; // false,
    fail_reason?: any; // null,
    failed_at: number; // 0,
    imp_uid: string; //'imp_428758996329',
    merchant_uid: string; //'cl9p83v7a000jfnenarrxushc',
    name: string; // '일반 결제',
    paid_at: Date; //1666763788,
    pay_method: string; // 'card',
    pg_id: string; // 'INIpayTest',
    pg_provider: string; // 'html5_inicis',
    pg_tid: string; // 'StdpayCARDINIpayTest20221026145627935013',
    receipt_url: string; // 'https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20221026145627935013&noMethod=1',
    started_at: Date; //1666763758,
    status: IamportPaymentStatus;
    user_agent: string; // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    vbank_code?: string;
    vbank_date: Date | 0;
    vbank_holder?: string;
    vbank_issued_at: Date | 0;
    vbank_name?: string;
    vbank_num?: string;
}

export enum IamportPaymentStatus {
    ready = 'ready',
    paid = 'paid',
    failed = 'failed',
    cancelled = 'cancelled',
}
