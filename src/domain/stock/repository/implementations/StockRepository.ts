import {StockQuantity} from '../../../../utils/OrderUtils';
import {PrismaClient} from '@prisma/client';
import {StockRepositoryInterface} from '../interfaces/StockRepositoryInterface';

export class StockRepository implements StockRepositoryInterface {
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async getActualStock(): Promise<StockQuantity[]> {
        try {
            const stocks = await this.prismaClient.stock.findMany({
                include: {
                    warehouse: true,
                },
            });

            const groupedStocks: {[key: string]: StockQuantity} = {};

            stocks.forEach(stock => {
                const key = `${stock.name}-${stock.warehouseId}`;
                if (groupedStocks[key]) {
                    groupedStocks[key].quantity += stock.quantity;
                } else {
                    groupedStocks[key] = {
                        itemName: stock.name,
                        quantity: stock.quantity,
                        warehouseName: stock.warehouse.name,
                    };
                }
            });

            return Object.values(groupedStocks);
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
