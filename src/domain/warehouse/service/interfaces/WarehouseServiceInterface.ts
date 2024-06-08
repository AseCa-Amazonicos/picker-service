import {Warehouse} from '@prisma/client';

export interface WarehouseServiceInterface {
    createWarehouse(name: string): Promise<Warehouse>;
    getWarehouses(): Promise<Warehouse[]>;
}
