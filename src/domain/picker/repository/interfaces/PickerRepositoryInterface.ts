export interface PickerRepositoryInterface {

    prepareOrder(orderId: number): Promise<boolean>;
    readyToShip(orderId: number): Promise<boolean>;
}
