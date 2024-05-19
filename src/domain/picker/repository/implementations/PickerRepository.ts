import {PickerRepositoryInterface} from '../interfaces/PickerRepositoryInterface';
import {PrismaClient} from '@prisma/client';

export class PickerRepository implements PickerRepositoryInterface {
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async prepareOrder(orderId: number): Promise<boolean> {
        const order = await this.prismaClient.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (!order) {
            return false;
        }

        const orderItems = await this.prismaClient.item.findMany({
            where: {
                orderId: orderId,
            },
        });

        for (const orderItem of orderItems) {
            const stocks = await this.prismaClient.stock.findMany({
                where: {
                    productId: orderItem.productId,
                },
            });
            const stock = stocks.length > 0 ? stocks[0] : null;
            if (!stock) {
                return false;
            }
            await this.prismaClient.stock.update({
                where: {
                    id: stock.id,
                },
                data: {
                    quantity: {
                        decrement: orderItem.quantity,
                    },
                },
            });
        }

        await this.prismaClient.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'PREPARING',
            },
        });

        return true;
    }

    async readyToShip(orderId: number): Promise<boolean> {
        const order = await this.prismaClient.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (order) {
            if (order.status === 'PREPARING') {
                await this.prismaClient.order.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        status: 'READY_TO_SHIP',
                    },
                });
                return true;
            }
        }
        return false;
    }
}
