import { IProduct } from "./product";
import { ILocation } from "../actions/book";
import { IService } from "./service";

export interface IBookState {
    location: ILocation
    clientId: string,
    deviceToken: string,
    products: IProduct[],
    services: IService[],
    quantity: number,
    total: number,
    isRequesting: boolean,
    status: string,
    activeProduct?: IProduct | null,
    activeService?: IService | null
}