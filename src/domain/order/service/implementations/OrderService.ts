import {OrderServiceInterface} from '../interfaces/OrderServiceInterface';
import {OrderRepository} from '../../repository/implementations/OrderRepository';
import {Item, Order, OrderStatus} from '@prisma/client';
import {Status, StockQuantity} from "../../../../utils/OrderUtils";

export class OrderService implements OrderServiceInterface {
    orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async addOrder(id: number, orderStatus: OrderStatus, items: Item[]): Promise<Order | null> {
        const isValidId = await this.getOrder(id);
        if (isValidId) {
            return null;
        }
        const order = await this.orderRepository.addOrder(id, orderStatus, items);
        if (order) {
            return order;
        }
        return null;
    }

    async getOrder(orderId: number): Promise<Status | null> {
        const status = await this.orderRepository.getOrder(orderId);
        if (status) {
            return status;
        }
        return null;
    }

    async getAllOrders(): Promise<Status[]> {
        const statusArray = await this.orderRepository.getAllOrders();
        if (statusArray) {
            return statusArray;

        }
        throw new Error('Failed to get all orders');
    }

}
