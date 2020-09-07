import { IDispatchActionPayload } from "../interfaces/common";
import { REGISTER_ACTION_TYPE_CHANGE_FIELDS } from "../action-types/register";
import { IRegisterState } from "../interfaces/register";

const registerActionChangeFields = (fields: Partial<IRegisterState>): IDispatchActionPayload => ({
    type: REGISTER_ACTION_TYPE_CHANGE_FIELDS,
    payload: fields
})

export {
    registerActionChangeFields
}