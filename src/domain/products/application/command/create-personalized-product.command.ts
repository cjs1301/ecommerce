import { ICommand } from '@nestjs/cqrs';

export class CreatePersonalizedProductCommand implements ICommand {
    constructor(
        readonly elasticityScore: number,
        readonly breakoutScore: number,
        readonly sensitivityScore: number,
        readonly agingScore: number,
        readonly dehydrationScore: number,
        readonly odorScore: number,
        readonly darknessScore: number,
        readonly deadSkinScore: number,
        readonly recoveryScore: number,
        readonly itchyScore: number,
        readonly baseScore: number,
    ) {}
}
