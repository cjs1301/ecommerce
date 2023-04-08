import { Order } from '../orders/order.entity';

export class Payment {
    orderId: string;
    order?: Order;
    amount: number;
    provider: string | null;
    createdAt: Date;
    updatedAt: Date;
}
