export interface StockControllerInterface {
    getActualStock(req: any, res: any): Promise<void>;

    addStock(req: any, res: any): Promise<void>;
}
