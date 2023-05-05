export enum UserType {
    Admin = "admin",
    Customer = "customer",
    UnAuthenticated = "unauthenticated",
}

export default class User {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public phone: string,
        public type: UserType,
        public telephoneOffer?: object
    ) {}
}
