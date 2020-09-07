export interface IRegisterState {
    fullName: string,
    firstName: string,
    lastName: string,
    email: string,
    birthdate: string,
    phone: string,
    password?: string,
    via: "FACEBOOK" | "GOOGLE" | "PERSONAL",
    fbToken?: string,
    deviceToken?: string,
    picture: string
}