import {Router} from 'express';
import {OrderController} from '../domain/order/controller/implementations/OrderController';
import {OrderService} from '../domain/order/service/implementations/OrderService';
import {OrderRepository} from '../domain/order/repository/implementations/OrderRepository';
import {PrismaClient} from '@prisma/client';
import {StockRepository} from '../domain/stock/repository/implementations/StockRepository';
import {StockService} from '../domain/stock/service/implementations/StockService';
import {StockController} from '../domain/stock/controller/implementations/StockController';

const router = Router();

const prismaClient = new PrismaClient();
const orderRepository = new OrderRepository(prismaClient);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const stockRepository = new StockRepository(prismaClient);
const stockService = new StockService(stockRepository);
const stockController = new StockController(stockService);

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
router.put('/prepare_order', (req, res) => {});

router.put('/ready_to_ship', (req, res) => {});

export default router;
