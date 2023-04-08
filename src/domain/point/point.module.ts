import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { PointService } from './services/point.service';
import { PointRepository } from './repository/point.repository';

@Module({
    imports: [PrismaModule],
    providers: [PointService, PointRepository],
    exports: [PointService],
})
export class PointModule {}
