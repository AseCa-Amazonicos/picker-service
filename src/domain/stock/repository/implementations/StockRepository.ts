import {StockProductId, StockQuantity} from '../../../../utils/OrderUtils';
import {PrismaClient} from '@prisma/client';
import {StockRepositoryInterface} from '../interfaces/StockRepositoryInterface';

export class StockRepository implements StockRepositoryInterface {
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async getActualStock(): Promise<StockQuantity[]> {
        try {
            const stocks = await this.prismaClient.stock.groupBy({
                by: ['name'],
                _sum: {
                    quantity: true,
                },
            });

            return stocks.map(stock => {
                return {
                    itemName: stock.name,
                    quantity: stock._sum.quantity || 0,
                };
            });
        } catch (e) {
            throw new Error('Failed to get actual stock');
        }
    }

    async getActualStockWProductId(): Promise<StockProductId[]> {
        try {
            const stocks = await this.prismaClient.stock.groupBy({
                by: ['productId'],
                _sum: {
                    quantity: true,
                },
            });

            return stocks.map(stock => {
                return {
                    productId: stock.productId,
                    quantity: stock._sum.quantity || 0,
                };
            });
        } catch (e) {
            throw new Error('Failed to get actual stock');
        }
    }

    async addStock(
        productId: number,
        quantity: number,
        name: string,
        warehouseId: number
    ): Promise<boolean> {
        try {
            const warehouse = await this.prismaClient.warehouse.findUnique({
                where: {
                    id: warehouseId,
                },
            });

            if (!warehouse) {
                return false;
            }

            const existingStocks = await this.prismaClient.stock.findMany({
                where: {productId: productId, warehouseId: warehouseId},
            });

            if (existingStocks && existingStocks.length > 0) {
                const existingStock = existingStocks[0];
                await this.prismaClient.stock.update({
                    where: {id: existingStock.id},
                    data: {quantity: {increment: quantity}},
                });
            } else {
                await this.prismaClient.stock.create({
                    data: {
                        quantity: quantity,
                        name: name,
                        warehouseId: warehouseId,
                        productId: productId,
                    },
                });
            }

            return true;
        } catch (e) {
            throw new Error('Failed to add stock');
        }
    }
}
