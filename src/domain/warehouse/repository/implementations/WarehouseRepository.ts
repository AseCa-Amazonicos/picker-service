import {WarehouseRepositoryInterface} from '../interfaces/WarehouseRepositoryInterface';
import {PrismaClient, Warehouse} from '@prisma/client';

export class WarehouseRepository implements WarehouseRepositoryInterface {
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async createWarehouse(name: string): Promise<Warehouse> {
        const existingWarehouse = await this.prismaClient.warehouse.findFirst({
            where: {name},
        });

        if (existingWarehouse) {
            throw new Error('A warehouse with this name already exists');
        }

        const warehouse = await this.prismaClient.warehouse.create({
            data: {name},
        });

        if (warehouse) return warehouse;
        else throw new Error('Warehouse not created');
    }
}
