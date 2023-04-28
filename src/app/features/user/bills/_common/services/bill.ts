export default class Bill {
    constructor(
        public id: string,
        public name: string,
        public amount: number,
        public paid: boolean,
        public type: string,
        public dueDate?: Date,
        public paymentDate?: Date
    ) {}

  get amountFormatted(): string {
        return new Intl.NumberFormat("en-EG", {
            style: "currency",
            currency: "EGP",
        }).format(this.amount);
  }
    get dueDateFormatted(): string {
        return this.dueDate
            ? new Intl.DateTimeFormat().format(this.dueDate).toString()
            : "Due date is not determined yet";
    }

    get paymentDateFormatted(): string {
        return this.paid
            ? new Intl.DateTimeFormat().format(this.paymentDate).toString()
            : "Not paid yet";
    }

    static fromDTO(dto: any): Bill {
        return new Bill(
            dto.id,
            dto.name,
            dto.amount,
            dto.paid,
            dto.type,
            dto.dueDate ? new Date(dto.dueDate) : undefined,
            dto.paymentDate ? new Date(dto.paymentDate) : undefined
        );
    }
}
