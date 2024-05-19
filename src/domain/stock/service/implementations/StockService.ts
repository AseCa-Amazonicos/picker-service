import {StockQuantity} from '../../../../utils/OrderUtils';
import {StockRepository} from '../../repository/implementations/StockRepository';
import {StockServiceInterface} from '../interfaces/StockServiceInterface';

export class StockService implements StockServiceInterface {
    stockRepository: StockRepository;

    constructor(stockRepository: StockRepository) {
        this.stockRepository = stockRepository;
    }

    async getActualStock(): Promise<StockQuantity[]> {
        const stock = await this.stockRepository.getActualStock();
        if (stock) {
            return stock;
        }
        throw new Error('Failed to get actual stock');
    }

    async addStock(
        productId: number,
        quantity: number,
        name: string,
        warehouseId: number
    ): Promise<boolean> {
        return await this.stockRepository.addStock(
            productId,
            quantity,
            name,
            warehouseId
        );
    }
}
