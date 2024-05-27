import {StockService} from '../../service/implementations/StockService';
import {StockControllerInterface} from '../interfaces/StockControllerInterface';

export class StockController implements StockControllerInterface {
    stockService: StockService;

    constructor(stockService: StockService) {
        this.stockService = stockService;
    }

    async getActualStock(req: any, res: any): Promise<void> {
        const stock = await this.stockService.getActualStock();
        if (stock) {
            res.status(200).json(stock);
            return;
        }
        res.status(500).send('Failed to get actual stock');
    }

    async addStock(req: any, res: any): Promise<void> {
        const productId = Number(req.body.productId);
        const quantity = Number(req.body.quantity);
        const productName = req.body.name;
        const warehouseId = Number(req.body.warehouseId);
        const wasStockAdded = await this.stockService.addStock(
            productId,
            quantity,
            productName,
            warehouseId
        );
        if (wasStockAdded) {
            res.status(200).send('Stock added successfully');
            return;
        }
        res.status(500).send('Failed to add stock');
    }

    async getActualStockWProductId(req: any, res: any): Promise<void> {
        const stock = await this.stockService.getActualStockWProductId();
        if (stock) {
            res.status(200).json(stock);
            return;
        }
        res.status(500).send('Failed to get actual stock');
    }
}
