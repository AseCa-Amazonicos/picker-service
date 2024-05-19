export interface OrderControllerInterface {
    addOrder(req: any, res: any): Promise<void>;

    getOrder(req: any, res: any): Promise<void>;

    getAllOrders(req: any, res: any): Promise<void>;
}
