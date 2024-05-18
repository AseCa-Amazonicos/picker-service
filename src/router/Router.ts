import {Router} from "express";
import {OrderController} from "../domain/order/controller/implementations/OrderController";
import {OrderService} from "../domain/order/service/implementations/OrderService";
import {OrderRepository} from "../domain/order/repository/implementations/OrderRepository";
import {PrismaClient} from '@prisma/client';

const router = Router();

const prismaClient = new PrismaClient();
const orderRepository = new OrderRepository(prismaClient);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

//Communication with control tower
router.post("/add_order", (req, res) => {
    orderController.addOrder(req, res);
});

router.get("/get_order_by_id", (req, res) => {
    orderController.getOrder(req, res);
});

router.get("/get_all_orders", (req, res) => {
    orderController.getAllOrders(req, res);
});

router.get("/get_actual_stock", (req, res) => {
    orderController.getActualStock(req, res);
});

//Communication with ui
router.put("/add_stock", (req, res) => {

});

//sacar el stock del warehouse y cambiar el estado de la orden a preparing
router.put("/prepare_order", (req, res) => {

});

router.put("/ready_to_ship", (req, res) => {

});

export default router;
