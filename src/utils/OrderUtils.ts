import {Item, OrderStatus} from '@prisma/client';

export type Status = {
    orderId: number;
    status: OrderStatus;
    item: Item[];
};

export type StockQuantity = {
    itemName: string;
    quantity: number;
};

export type StockProductId = {
    productId: number;
    quantity: number;
};
