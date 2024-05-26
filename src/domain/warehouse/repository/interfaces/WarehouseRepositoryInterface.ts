import {Warehouse} from '@prisma/client';

export interface WarehouseRepositoryInterface {
    createWarehouse(name: string): Promise<Warehouse>;
}
