import {StockProductId, StockQuantity} from '../../../../utils/OrderUtils';
import {StockRepository} from '../../repository/implementations/StockRepository';
import {StockServiceInterface} from '../interfaces/StockServiceInterface';
import axios from "axios";
import {Product} from "../../../../utils/Product";

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
        quantity: number,
        name: string,
        warehouseId: number
    ): Promise<boolean> {
        const product: Product = await this.addProductInCT(name)
        return await this.stockRepository.addStock(
            product.id,
            quantity,
            name,
            warehouseId
        );
    }

    async getActualStockWProductId(): Promise<StockProductId[]> {
        const stock = await this.stockRepository.getActualStockWProductId();
        if (stock) {
            return stock;
        }
        throw new Error('Failed to get actual stock');
    }

    async addProductInCT(
        name: string,
    ): Promise<Product> {
        // console.log("Calling the picker service...");
        return axios.post(`http://localhost:8080/api/product`, {
            "name": name,
            "price": 1
        })
            .then(response => {
                // Process the response data
                // console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }
}
