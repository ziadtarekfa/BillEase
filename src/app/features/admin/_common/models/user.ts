import Bill from "../../../user/bills/_common/services/bill";

export default class Customer {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public bills?: Array<Bill>
    ) {}

    get billsCount() {
        return this.bills?.length || 0;
    }

    static fromDTO(dto: any) {
        return new Customer(dto.id, dto.name, dto.email, dto.phone, dto.bills);
    }
}
