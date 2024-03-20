export interface User{
    id: number,
    name: {
        firstName: string,
        middleName:string,
        lastName:string
    },
    email: string,
    address: {
        city: string,
        street: string,
        number: number,
        zipcode: string
    },
    phoneNumber: string,
    role: string
}