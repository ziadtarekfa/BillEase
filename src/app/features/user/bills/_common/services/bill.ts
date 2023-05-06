import formatCurrency from "../../../../../../utils/currency-formatter";

export default class Bill {
    constructor(
        public id: string,
        public type: string,
        public paid: boolean,
        public consumedUnits: number,
        public fees: number,
        public createdAt: Date,
        public dueDate?: Date,
        public paymentDate?: Date,
        public paidAmount?: number
    ) {}

    get amountFormatted(): string {
        return formatCurrency(1);
    }

    get dueDateFormatted(): string {
        return this.dueDate
            ? new Intl.DateTimeFormat().format(this.dueDate).toString()
            : "Due date is not determined yet";
    }

    get paymentDateFormatted(): string {
        return this.paid
            ? `Paid ${formatCurrency(
                  this.paidAmount
              )} at ${new Intl.DateTimeFormat()
                  .format(this.paymentDate)
                  .toString()}`
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
                return "liter";
            case "telephone":
                return "minutes";
            default:
                return "";
        }
    }

    get consumedUnitsFormatted(): string {
        return `${this.consumedUnits} ${this.unit}`;
    }

    get totalFees(): number {
        return 1;
    }

    get overdueFees(): number {
        return 1;
    }

    get billFees(): number {
        return 1;
    }

    static fromDTO(dto: any): Bill {
        return new Bill(
            dto.id,
            dto.type,
            dto.paid,
            dto.consumedUnits ?? 0,
            dto.fees,
            dto.createdAt ? new Date(dto.createdAt) : new Date(),
            dto.dueDate ? new Date(dto.dueDate) : undefined,
            dto.paymentDate ? new Date(dto.paymentDate) : undefined,
            dto.paidAmount ?? 0
        );
    }

    toDTO(): any {
        return {
            id: this.id,
            type: this.type,
            paid: this.paid,
            consumedUnits: this.consumedUnits,
          fees: this.fees,
            createdAt: this.createdAt.toISOString(),
            dueDate: this.dueDate?.toISOString(),
            paymentDate: this.paymentDate?.toISOString(),
            paidAmount: this.paidAmount,
        };
    }
}
