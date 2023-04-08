import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePersonalizedProductCommand } from './create-personalized-product.command';
import { IProductsRepository } from '../../domain/repository/iproducts.repository';
import { SkinSymbol } from '../type/skin-type.';
import { GetProductResDto } from '../../interface/dto/res/get-product.res.dto';

interface IsortObject {
    score: number;
    name: string;
}
@Injectable()
@CommandHandler(CreatePersonalizedProductCommand)
export class CreatePersonalizedProductHandler
    implements ICommandHandler<CreatePersonalizedProductCommand>
{
    constructor(
        @Inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    async execute(
        command: CreatePersonalizedProductCommand,
    ): Promise<GetProductResDto> {
        const {
            elasticityScore,
            breakoutScore,
            sensitivityScore,
            agingScore,
            dehydrationScore,
            odorScore,
            darknessScore,
            deadSkinScore,
            recoveryScore,
            itchyScore,
            baseScore,
        } = command;

        const skinTypeSymbol = generateOMRType(
            agingScore,
            dehydrationScore,
            sensitivityScore,
            elasticityScore,
            breakoutScore,
            deadSkinScore,
        ).skinTypeSymbol;
        const prescribedBaseItem = prescribeBaseItems(
            skinTypeSymbol,
            baseScore,
        );

        const prescribedBundleItems = prescribeBundleItems(
            elasticityScore,
            breakoutScore,
            sensitivityScore,
            agingScore,
            dehydrationScore,
            odorScore,
            darknessScore,
            deadSkinScore,
            recoveryScore,
            itchyScore,
        );
        const product = await this.productsRepository.findUniquePersonalized();

        return {
            ...product,
            bundles: product.bundles.map((bundle) => {
                return {
                    ...bundle,
                    items: bundle.items.filter((item) => {
                        switch (bundle.name) {
                            case 'base':
                                if (
                                    item.product.meta.name ===
                                    prescribedBaseItem.name
                                )
                                    return item;
                                break;
                            case 'highConcentration1':
                                if (
                                    item.product.meta.name.includes(
                                        prescribedBundleItems[0].name,
                                    )
                                )
                                    return item;
                                break;
                            case 'highConcentration2':
                                if (
                                    item.product.meta.name.includes(
                                        prescribedBundleItems[0].name,
                                    )
                                )
                                    return item;
                                break;
                            case 'mediumConcentration1':
                                if (
                                    item.product.meta.name.includes(
                                        prescribedBundleItems[0].name,
                                    )
                                )
                                    return item;
                                break;
                            case 'mediumConcentration2':
                                if (
                                    item.product.meta.name.includes(
                                        prescribedBundleItems[0].name,
                                    )
                                )
                                    return item;
                                break;
                            case 'lowConcentration':
                                if (
                                    item.product.meta.name.includes(
                                        prescribedBundleItems[0].name,
                                    )
                                )
                                    return item;
                        }
                    }),
                };
            }),
        };
    }
}

export const prescribeBundleItems = (
    elasticityScore: number,
    breakoutScore: number,
    sensitivityScore: number,
    agingScore: number,
    dehydrationScore: number,
    odorScore: number,
    darknessScore: number,
    deadSkinScore: number,
    recoveryScore: number,
    itchyScore: number,
) => {
    const biomes = [
        {
            score: agingScore,
            name: 'aging',
        },
        {
            score: breakoutScore,
            name: 'breakout',
        },
        {
            score: darknessScore,
            name: 'darkness',
        },
        {
            score: deadSkinScore,
            name: 'deadSkin',
        },
        {
            score: dehydrationScore,
            name: 'dehydration',
        },
        {
            score: elasticityScore,
            name: 'elasticity',
        },
        {
            score: itchyScore,
            name: 'itchy',
        },
        {
            score: odorScore,
            name: 'odor',
        },
        {
            score: recoveryScore,
            name: 'recovery',
        },
        {
            score: sensitivityScore,
            name: 'sensitivity',
        },
    ];

    const sortedBiomes = sortObjectsByScore(biomes);

    return sortedBiomes.slice(0, 5);
};

function sortObjectsByScore(objects: IsortObject[]): IsortObject[] {
    return objects.sort((a, b) => a.score - b.score);
}
function generateOMRType(
    agingScore: number,
    dehydrationScore: number,
    sensitivityScore: number,
    elasticityScore: number,
    breakoutScore: number,
    deadskinScore: number,
): {
    skinType: string;
    skinTypeSymbol: SkinSymbol;
    oilScore: number;
    notOliScore: number;
    moistScore: number;
    dryScore: number;
    sensiScore: number;
    resisScore: number;
} {
    const oilScore = (dehydrationScore + deadskinScore) * 0.5;
    const notOliScore = 100 - (dehydrationScore + deadskinScore) * 0.5;
    const moistScore = dehydrationScore;
    const dryScore = 100 - dehydrationScore;
    const sensiScore = 100 - sensitivityScore;
    const resisScore = sensitivityScore;

    if (oilScore > 50 && moistScore > 50) {
        if (resisScore > 50) {
            return {
                skinType: 'Oily,Moistured,Resistant',
                skinTypeSymbol: 'OMR',
                oilScore,
                notOliScore,
                moistScore,
                dryScore,
                sensiScore,
                resisScore,
            };
        }
        return {
            skinType: 'Oily,Moistured,Sensitive',
            skinTypeSymbol: 'OMS',
            oilScore,
            notOliScore,
            moistScore,
            dryScore,
            sensiScore,
            resisScore,
        };
    } else if (notOliScore > 50 && moistScore > 50) {
        if (resisScore > 50) {
            return {
                skinType: 'Not-Oily,Moistured,Resistant',
                skinTypeSymbol: 'NMR',
                oilScore,
                notOliScore,
                moistScore,
                dryScore,
                sensiScore,
                resisScore,
            };
        }
        return {
            skinType: 'Not-Oily,Moistured,Sensitive',
            skinTypeSymbol: 'NMS',
            oilScore,
            notOliScore,
            moistScore,
            dryScore,
            sensiScore,
            resisScore,
        };
    } else if (oilScore > 50 && dryScore > 50) {
        if (resisScore > 50) {
            return {
                skinType: 'Oily,Dry,Resistant',
                skinTypeSymbol: 'ODR',
                oilScore,
                notOliScore,
                moistScore,
                dryScore,
                sensiScore,
                resisScore,
            };
        }
        return {
            skinType: 'Oily,Dry,Sensitive',
            skinTypeSymbol: 'ODS',
            oilScore,
            notOliScore,
            moistScore,
            dryScore,
            sensiScore,
            resisScore,
        };
    } else if (notOliScore > 50 && dryScore > 50) {
        if (resisScore > 50) {
            return {
                skinType: 'Not-Oily,Dry,Resistant',
                skinTypeSymbol: 'NDR',
                oilScore,
                notOliScore,
                moistScore,
                dryScore,
                sensiScore,
                resisScore,
            };
        }
        return {
            skinType: 'Not-Oily,Dry,Resistant',
            skinTypeSymbol: 'NDS',
            oilScore,
            notOliScore,
            moistScore,
            dryScore,
            sensiScore,
            resisScore,
        };
    } else {
        throw new Error();
    }
}

export const prescribeBaseItems = (type: SkinSymbol, baseScore: number) => {
    if (type.includes('O') && baseScore >= 50) {
        return {
            name: 'oily_ample',
        };
    }

    if (type.includes('D') && baseScore >= 50) {
        return {
            name: 'dry_ample',
        };
    }

    if (type.includes('S') && baseScore >= 50) {
        return {
            name: 'sensitivity_ample',
        };
    }

    if (type.includes('OD') && baseScore >= 50) {
        return {
            name: 'comb_ample',
        };
    }

    if (type.includes('O') && baseScore < 50) {
        return {
            name: 'oily_toner',
        };
    }

    if (type.includes('D') && baseScore < 50) {
        return {
            name: 'dry_toner',
        };
    }

    if (type.includes('S') && baseScore < 50) {
        return {
            name: 'sensitivity_toner',
        };
    }

    if (type.includes('OD') && baseScore < 50) {
        return {
            name: 'comb_toner',
        };
    }

    return {
        name: 'Error',
    };
};
