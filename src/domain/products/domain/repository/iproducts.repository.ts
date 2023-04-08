import { GetProductResDto } from '../../interface/dto/res/get-product.res.dto';

export interface IProductsRepository {
    findUniquePersonalized: () => Promise<GetProductResDto>;
}
