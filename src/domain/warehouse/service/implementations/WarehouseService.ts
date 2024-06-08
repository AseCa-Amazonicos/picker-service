import {WarehouseServiceInterface} from '../interfaces/WarehouseServiceInterface';
import {WarehouseRepository} from '../../repository/implementations/WarehouseRepository';
import {Warehouse} from '@prisma/client';

export class WarehouseService implements WarehouseServiceInterface {
    warehouseRepository: WarehouseServiceInterface;

    constructor(warehouseRepository: WarehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    async createWarehouse(name: string): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.createWarehouse(name);
        if (!warehouse) {
            throw new Error('Warehouse not created');
        }
        return warehouse;
    }

    async getWarehouses(): Promise<Warehouse[]> {
        const warehouses = await this.warehouseRepository.getWarehouses();
        if (warehouses) {
            return warehouses;
        }
        throw new Error('Failed to get warehouses');
    }
}
