import {Request, Response} from 'express';

export interface WarehouseControllerInterface {
    createWarehouse(req: Request, res: Response): Promise<void>;
}
