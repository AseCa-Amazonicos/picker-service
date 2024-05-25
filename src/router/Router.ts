import {Router} from 'express';
import {OrderController} from '../domain/order/controller/implementations/OrderController';
import {OrderService} from '../domain/order/service/implementations/OrderService';
import {OrderRepository} from '../domain/order/repository/implementations/OrderRepository';
import {PrismaClient} from '@prisma/client';
import {StockRepository} from '../domain/stock/repository/implementations/StockRepository';
import {StockService} from '../domain/stock/service/implementations/StockService';
import {StockController} from '../domain/stock/controller/implementations/StockController';
import {PickerController} from '../domain/picker/controller/implementations/PickerController';
import {PickerRepository} from '../domain/picker/repository/implementations/PickerRepository';
import {PickerService} from '../domain/picker/service/implementations/PickerService';
import {WarehouseService} from '../domain/warehouse/service/implementations/WarehouseService';
import {WarehouseController} from '../domain/warehouse/controller/implementations/WarehouseController';
import {WarehouseRepository} from '../domain/warehouse/repository/implementations/WarehouseRepository';

const router = Router();

const prismaClient = new PrismaClient();
const orderRepository = new OrderRepository(prismaClient);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const stockRepository = new StockRepository(prismaClient);
const stockService = new StockService(stockRepository);
const stockController = new StockController(stockService);

const pickerRepository = new PickerRepository(prismaClient);
const pickerService = new PickerService(pickerRepository, orderRepository);
const pickerController = new PickerController(pickerService);

const warehouseRepository = new WarehouseRepository(prismaClient);
const warehouseService = new WarehouseService(warehouseRepository);
const warehouseController = new WarehouseController(warehouseService);

//Communication with control tower
router.post('/order/add_order', (req, res) => {
    orderController.addOrder(req, res);
});

router.get('/order/get_order_by_id', (req, res) => {
    orderController.getOrder(req, res);
});

router.get('/order/get_all_orders', (req, res) => {
    orderController.getAllOrders(req, res);
});

router.get('/stock/get_actual_stock', (req, res) => {
    stockController.getActualStock(req, res);
});

//Communication with ui
router.put('/stock/add_stock', (req, res) => {
    stockController.addStock(req, res);
});

//sacar el stock del warehouse y cambiar el estado de la orden a preparing
router.put('/picker/prepare_order', (req, res) => {
    pickerController.prepareOrder(req, res);
});

router.put('/picker/ready_to_ship', (req, res) => {
    pickerController.readyToShip(req, res);
});

router.post('/warehouse/create', (req, res) => {
    warehouseController.createWarehouse(req, res);
});

export default router;
