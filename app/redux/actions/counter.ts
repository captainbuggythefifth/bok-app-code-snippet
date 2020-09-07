import { IDispatchActionPayload } from "../interfaces/common";
import { COUNTER_ACTION_TYPE_CHANGE_COUNT } from "../action-types/counter";

const counterActionIncrement = (count: number): IDispatchActionPayload => ({
    type: COUNTER_ACTION_TYPE_CHANGE_COUNT,
    payload: count + 1
});

const counterActionDecrement = (count: number): IDispatchActionPayload => ({
    type: COUNTER_ACTION_TYPE_CHANGE_COUNT,
    payload: count - 1
});

export {
    counterActionIncrement,
    counterActionDecrement
}