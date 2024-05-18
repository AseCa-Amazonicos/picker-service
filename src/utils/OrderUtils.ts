import {OrderStatus} from "@prisma/client";

export type Status = {
    orderId : number,
    status: OrderStatus
}

export type StockQuantity = {
    itemName: string,
    quantity: number
}
