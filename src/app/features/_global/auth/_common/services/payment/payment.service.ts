import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import RatesService from "../rates/rates.service";
import Bill from "../../../../../user/bills/_common/services/bill";
import { RatesLookup } from "../rates/rate";
import dateDifferenceCalculator from "../../../../../../../utils/date-diff-calculator";

@Injectable({
    providedIn: "root",
})
export default class PaymentService {
    constructor(
        private readonly http: HttpClient,
        private readonly ratesService: RatesService
    ) {}

    async calculateFees(bill: Bill, amount: number): Promise<number> {
        const rates: RatesLookup = await this.ratesService.get();
        const billFees = amount * rates[bill.type].unitCost;
        const diff = bill.dueDate
            ? dateDifferenceCalculator(bill.dueDate, new Date())
            : 0;
        return diff > 0 ? billFees + rates[bill.type].overdueFees : billFees;
    }
}
