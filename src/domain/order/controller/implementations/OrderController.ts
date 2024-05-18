import {OrderControllerInterface} from '../interfaces/OrderControllerInterface';
import {OrderService} from '../../service/implementations/OrderService';

export class OrderController implements OrderControllerInterface {
    orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    async addOrder(req: any, res: any): Promise<void> {
        const {orderStatus, items} = req.body;
        const id = Number(req.body.id);
        const order = await this.orderService.addOrder(id, orderStatus, items);
        if (order) {
            res.status(200).json(order);
            return;
        }
        res.status(500).json({ message: 'Failed to add order' });
    }

    async getOrder(req: any, res: any): Promise<void> {
        const orderId = Number(req.body.orderId);
        const order = await this.orderService.getOrder(orderId);
        if (order) {
            res.status(200).json(order);
            return;
        }
        res.status(500).json({ message: `Failed to get order with order id: ${orderId}` });
    }

    async getAllOrders(req: any, res: any): Promise<void> {
        const orders = await this.orderService.getAllOrders();
        if (orders) {
            res.status(200).json(orders);
            return;
        }
        res.status(500).send('Failed to get all orders');
    }

    async getActualStock(req: any, res: any): Promise<void> {
        const stock = await this.orderService.getActualStock();
        if (stock) {
            res.status(200).json(stock);
            return;
        }
        res.status(500).send('Failed to get actual stock');
    }
}
