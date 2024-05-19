import {PickerControllerInterface} from '../interfaces/PickerControllerInterface';
import {Request, Response} from 'express';
import {PickerService} from '../../service/implementations/PickerService';

export class PickerController implements PickerControllerInterface {
    pickerService: PickerService;

    constructor(pickerService: PickerService) {
        this.pickerService = pickerService;
    }

    async prepareOrder(req: Request, res: Response): Promise<void> {
        const orderId = Number(req.body.orderId);
        try {
            const isStatusChanged =
                await this.pickerService.prepareOrder(orderId);
            if (isStatusChanged) {
                res.status(200).send({
                    message: "Order status changed to 'PREPARING'",
                });
            } else {
                res.status(400).send({message: 'Order status not changed'});
            }
        } catch (error) {
            res.status(500).send({message: (error as Error).message});
        }
    }

    async readyToShip(req: Request, res: Response): Promise<void> {
        const orderId = Number(req.body.orderId);
        const isStatusChanged = await this.pickerService.readyToShip(orderId);
        if (isStatusChanged) {
            res.status(200).send({
                message: "Order status changed to 'READY_TO_SHIP'",
            });
        } else {
            res.status(400).send({message: 'Order status not changed'});
        }
    }
}
