import { Product, Bundle } from '@prisma/client';

type PersonalizedBundleName =
    | 'base'
    | 'highConcentration1'
    | 'highConcentration2'
    | 'mediumConcentration1'
    | 'mediumConcentration2'
    | 'lowConcentration';

interface PersonalizedBundle extends Bundle {
    name: PersonalizedBundleName;
}

export interface PersonalizedProduct extends Product {
    type: 'personalized';
    bundles: PersonalizedBundle[];
}
