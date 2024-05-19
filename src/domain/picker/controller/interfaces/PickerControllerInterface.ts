import {Request, Response} from 'express';

export interface PickerControllerInterface {
    prepareOrder(req: Request, res: Response): Promise<void>;

    readyToShip(req: Request, res: Response): Promise<void>;
}
