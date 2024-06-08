import {Request, Response} from 'express';

export interface WarehouseControllerInterface {
    createWarehouse(req: Request, res: Response): Promise<void>;
    getWarehouses(req: any, res: any): Promise<void>;
}
