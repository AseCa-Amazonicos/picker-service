import {WarehouseServiceInterface} from '../interfaces/WarehouseServiceInterface';
import {WarehouseRepository} from '../../repository/implementations/WarehouseRepository';
import {Warehouse} from '@prisma/client';

export class WarehouseService implements WarehouseServiceInterface {
    warehouseRepository: WarehouseServiceInterface;

    constructor(warehouseRepository: WarehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    async createWarehouse(name: string): Promise<Warehouse> {
        return await this.warehouseRepository.createWarehouse(name);
    }
}
