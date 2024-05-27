import {StockProductId, StockQuantity} from '../../../../utils/OrderUtils';

export interface StockRepositoryInterface {
    getActualStock(): Promise<StockQuantity[]>;

    addStock(
        productId: number,
        quantity: number,
        name: string,
        warehouseId: number
    ): Promise<boolean>;

    getActualStockWProductId(): Promise<StockProductId[]>
}
