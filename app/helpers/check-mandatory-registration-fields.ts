import MANDATORY_REGISTRATION_FIELDS from "./mandatory-registration-fields"

const checkMandatoryRegistrationFields = (formFields: any) => {
    return MANDATORY_REGISTRATION_FIELDS.filter((i: string) => {
        return !formFields.includes(i);
    })
};

export default checkMandatoryRegistrationFields