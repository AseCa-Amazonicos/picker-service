import {StockProductId, StockQuantity} from '../../../../utils/OrderUtils';
import {Warehouse} from '@prisma/client';

export interface StockRepositoryInterface {
    getActualStock(): Promise<StockQuantity[]>;

    addStock(
        productId: number,
        quantity: number,
        name: string,
        warehouseId: number
    ): Promise<boolean>;

    getActualStockWProductId(): Promise<StockProductId[]>;
}
