import { IProduct } from "./product";
import { IService } from "./service";
import { IRequestState } from "./common";

export interface IBookingData {
    id: string,
    products: IProduct[],
    services: IService[],
    name: string,
    description: string,
    action: string,
    type: string,
    push_notification_topics: {
        provider: string,
        mender: string,
        business: string,
        business_menders_list: string
    },
    fees: {
        convenience_fee: number,
        distance_per_meter_fee: number,
        distance_fee: boolean,
        per_booking_fee: boolean
    }
}

export interface IBookingState {
    request: IRequestState,
    data: IBookingData[] | null,
}