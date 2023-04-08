import { BadRequestException, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../repository/fulfillment.repository';
import { CreateFulfillment } from '../dto/req/create-fulfillment.dto';
import { CreateFulfillments } from '../dto/req/create-fulfillments.dto';
import { FulfillmentStatus } from '@prisma/client';
import { UpdateFulfillment } from '../dto/req/update-fullfillment.dto';
import { OrdersRepository } from '../../orders/repository/orders.repository';
import { GetFulfillmentsQueryDto } from '../dto/req/get-fulfillments.query.dto';

@Injectable()
export class FulfillmentService {
    constructor(
        private readonly fulfillmentRepository: FulfillmentRepository,
        private readonly ordersRepository: OrdersRepository,
    ) {}

    async orderCreateFulfillment(orderId: string, data: CreateFulfillment) {
        const createFulfillmentsEnableStatus = ['paid', 'overPaid'];
        const order = await this.ordersRepository.findOne(orderId);
        if (!createFulfillmentsEnableStatus.includes(order.status)) {
            throw new BadRequestException(
                order.id + '는 결제 완료된 상태가 아닙니다.',
            );
        }
        return this.fulfillmentRepository.createFulfillment(orderId, data);
    }

    //TODO: 수정필요!!
    async orderCreateFulfillments(body: CreateFulfillments) {
        /*// 결제 완료된 주문내역인지 확인합니다.
        // 주문 아이디로 해당 주문에 해당하는 아이템 항목들의 아이디와 수량을 가져옵니다
        const orders = await this.ordersRepository.findAllByOrderIds(
            body.orders.map((order) => order.orderId),
            {
                id: true,
                status: true,
                items: {
                    select: { id: true, quantity: true },
                },
            },
        );

        const createFulfillmentsEnableStatus = ['paid', 'overPaid'];
        orders.forEach((order) => {
            if (
                !order.status ||
                !createFulfillmentsEnableStatus.includes(order.status)
            ) {
                throw new BadRequestException(
                    order.id + '는 결제 완료된 상태가 아닙니다.',
                );
            }
        });
        // 여러 주문들에 대한 배송내역을 생성하기위해 필요한 데이터 셋입니다
        const dataSet: Array<{
            itemId: string;
            quantity: number;
            status: FulfillmentStatus;
            trackingCompany: string;
        }> = [];
        // 배송 이행 내역 생성을 위해 필요한 항목들 형태로 만들어 줍니다
        orders.forEach((order) => {
            order.items?.forEach((item) => {
                const createFulfillment = body.orders.find(
                    (order) => order.orderId === item.id,
                );
                dataSet.push({
                    itemId: item.id,
                    quantity: item.quantity,
                    status: 'pending',
                    trackingCompany: createFulfillment.trackingCompany,
                });
            });
        });
        // 주문 배송이행 내역 생성
        return this.ordersRepository.createManyFulfillment(dataSet);*/
    }

    async orderUpdateFulfillment(orderId: string, data: UpdateFulfillment) {
        return this.fulfillmentRepository.updateFulfillment(orderId, data);
    }

    async orderDeleteFulfillment(orderId: string) {
        return this.fulfillmentRepository.deleteFulfillment(orderId);
    }

    async getFulfillments(query: GetFulfillmentsQueryDto) {
        return this.fulfillmentRepository.findAllWhitStatus(query);
    }
}
