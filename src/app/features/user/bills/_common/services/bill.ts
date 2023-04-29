export default class Bill {
    constructor(
        public id: string,
        public name: string,
        public amount: number,
        public paid: boolean,
        public type: string,
        public consumedUnits: number,
        public createdAt: Date,
        public paidAmount?: number,
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
            ? "Paid at " +
                  new Intl.DateTimeFormat().format(this.paymentDate).toString()
            : "Not paid yet";
    }

    get createdAtFormatted(): string {
        return new Intl.DateTimeFormat().format(this.createdAt).toString();
    }

    get unit(): string {
        switch (this.type) {
            case "electricity":
                return "kWh";
            case "water":
                return "m3";
            case "telephone":
                return "minutes";
            default:
                return "";
        }
    }

    get totalFees(): number {
        return this.amount + 1;
    }

    get overdueFees(): number {
        return 1;
    }

    get billFees(): number {
        return this.amount;
    }

    static fromDTO(dto: any): Bill {
        return new Bill(
            dto.id,
            dto.name,
            dto.amount,
            dto.paid,
            dto.type,
            dto.consumedUnits ?? 100,
            dto.createdAt ? new Date(dto.createdAt) : new Date(),
            dto.paidAmount ?? 0,
            dto.dueDate ? new Date(dto.dueDate) : undefined,
            dto.paymentDate ? new Date(dto.paymentDate) : undefined
        );
    }
}
