import {PickerServiceInterface} from '../interfaces/PickerServiceInterface';
import {PickerRepository} from "../../repository/implementations/PickerRepository";
import {OrderRepository} from "../../../order/repository/implementations/OrderRepository";

export class PickerService implements PickerServiceInterface {
    pickerRepository: PickerRepository;
    orderRepository: OrderRepository;

    constructor(pickerRepository: PickerRepository, orderRepository: OrderRepository) {
        this.pickerRepository = pickerRepository;
        this.orderRepository = orderRepository;
    }

    async prepareOrder(orderId: number): Promise<boolean> {
        const order = await this.orderRepository.getOrder(orderId);
        if (order){
            if (order.status === 'NOT_STARTED'){
                return await this.pickerRepository.prepareOrder(orderId);
            }
        }
        throw new Error('Order status is already PREPARING');
    }

    readyToShip(orderId: number): Promise<boolean> {
        return this.pickerRepository.readyToShip(orderId);
    }
}
