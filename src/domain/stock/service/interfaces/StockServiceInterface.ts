import {StockProductId, StockQuantity} from '../../../../utils/OrderUtils';
import {Warehouse} from '@prisma/client';

export interface StockServiceInterface {
    getActualStock(): Promise<StockQuantity[]>;

    addStock(
        stock: number,
        name: string,
        warehouseId: number
    ): Promise<boolean>;

    getActualStockWProductId(): Promise<StockProductId[]>;
}
