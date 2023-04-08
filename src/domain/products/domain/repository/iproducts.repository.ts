import { GetProductResDto } from '../../interface/dto/res/get-product.res.dto';

export interface IProductsRepository {
    findUnique: (productId: string) => Promise<GetProductResDto>;
}
