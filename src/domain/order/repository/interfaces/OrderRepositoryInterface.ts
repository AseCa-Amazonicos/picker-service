import {Item, Order, OrderStatus} from "@prisma/client";
import {Status, StockQuantity} from "../../../../utils/OrderUtils";

export interface OrderRepositoryInterface {

    addOrder(id: number, orderStatus: OrderStatus, items: Item[]) : Promise<Order | null>;
    getOrder(orderId: number) : Promise<Status | null>;
    getAllOrders() : Promise<Status[]>;
}
