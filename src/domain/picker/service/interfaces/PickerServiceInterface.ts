export interface PickerServiceInterface {
    prepareOrder(orderId: number): Promise<boolean>;

    readyToShip(orderId: number): Promise<boolean>;
}
