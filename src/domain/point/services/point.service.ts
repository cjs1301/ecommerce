import { Injectable } from '@nestjs/common';
import { PointRepository } from '../repository/point.repository';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { PointTransactionType } from '@prisma/client';

@Injectable()
export class PointService {
    constructor(private readonly pointRepository: PointRepository) {}

    async getPoint(
        customerId: string,
        point: number,
        type: PointTransactionType,
    ) {
        // 오늘중 같은 방식으로 포인트를 발급받은 이력이 있는지 확인
        const transactions = await this.pointRepository.findAllPointTransaction(
            customerId,
            type,
        );
        // 있다면 중복발급 에러 안내
        if (transactions.length > 0) {
            throw new Error('이미 포인트가 발급되었습니다.');
        }
        // 없다면 정상 포인트 지급
        // 지급된 방식 날짜 저장
        return this.pointRepository.incrementPoint(customerId, point, type);
    }

    async usePoint(
        tx: Omit<
            PrismaService,
            '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
        >,
        customerId: string,
        usePoint: number,
    ) {
        return this.pointRepository.createPointTransaction(
            tx,
            customerId,
            usePoint,
            'used',
        );
    }
}
