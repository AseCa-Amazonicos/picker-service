import {WarehouseControllerInterface} from '../interfaces/WarehouseControllerInterface';
import {WarehouseServiceInterface} from '../../service/interfaces/WarehouseServiceInterface';
import {WarehouseService} from '../../service/implementations/WarehouseService';
import {Request, Response} from 'express';

export class WarehouseController implements WarehouseControllerInterface {
    warehouseService: WarehouseServiceInterface;

    constructor(warehouseService: WarehouseService) {
        this.warehouseService = warehouseService;
    }

    async createWarehouse(req: Request, res: Response): Promise<void> {
        const name = req.body.name;
        try {
            const warehouse = await this.warehouseService.createWarehouse(name);
            res.status(201).json(warehouse);
        } catch (error) {
            res.status(500).json({message: (error as Error).message});
        }
    }

    async getWarehouses(req: any, res: any): Promise<void> {
        const warehouses = await this.warehouseService.getWarehouses();
        if (warehouses) {
            res.status(200).json(warehouses);
            return;
        }
        res.status(500).send('Failed to get warehouses');
    }
}
