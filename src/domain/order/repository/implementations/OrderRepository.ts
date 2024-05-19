import {OrderRepositoryInterface} from '../interfaces/OrderRepositoryInterface';
import {Item, Order, OrderStatus, PrismaClient} from '@prisma/client';
import {Status} from '../../../../utils/OrderUtils';

export class OrderRepository implements OrderRepositoryInterface {
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async addOrder(
        id: number,
        orderStatus: OrderStatus,
        items: Item[]
    ): Promise<Order | null> {
        const order = await this.prismaClient.order.create({
            data: {
                id: id,
                status: orderStatus,
                updatedAt: new Date(),
                items: {
                    create: items,
                },
            },
        });
        if (order) {
            return order;
        }
        return null;
    }

    async getOrder(orderId: number): Promise<Status | null> {
        try {
            const order = await this.prismaClient.order.findUnique({
                where: {
                    id: orderId,
                },
                include: {
                    items: true,
                },
            });

            if (!order) {
                return null;
            }
            return {
                orderId: order.id,
                status: order.status,
            };
        } catch (e) {
            return null;
        }
    }

    async getAllOrders(): Promise<Status[]> {
        try {
            const orders = await this.prismaClient.order.findMany({
                include: {
                    items: true,
                },
            });

            return orders.map(order => {
                return {
                    orderId: order.id,
                    status: order.status,
                };
            });
        } catch (e) {
            console.error(e);
            throw new Error('Failed to get all orders');
        }
    }
}
