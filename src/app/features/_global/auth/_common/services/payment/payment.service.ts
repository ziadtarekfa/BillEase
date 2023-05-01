import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import RatesService from "../rates/rates.service";
import Bill from "../../../../../user/bills/_common/services/bill";
import { RatesLookup } from "../rates/rate";
import dateDifferenceCalculator from "../../../../../../../utils/date-diff-calculator";
import { environment } from "../../../../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export default class PaymentService {
    rates?: RatesLookup;

    constructor(
        private readonly http: HttpClient,
        private readonly ratesService: RatesService
    ) {
        this.ratesService.get().then((rates) => (this.rates = rates));
    }

    calculateFees(bill: Bill): number {
        const rates: RatesLookup = this.rates as RatesLookup;
        const billFees = bill.consumedUnits * rates[bill.type].unitCost;
        const diff = bill.dueDate
            ? dateDifferenceCalculator(bill.dueDate, new Date())
            : 0;
        return diff > 0 ? billFees + rates[bill.type].overdueFees : billFees;
    }

    async pay(
        bill: Bill,
        userId: string,
        overrideFees?: number
    ): Promise<boolean> {
        const defaultFees = this.calculateFees(bill);
        return new Promise((resolve) => {
            this.http
                .patch(
                    `${environment.baseUrl}/bills/${userId}/${bill.id}.json`,
                    {
                        paid: true,
                        paymentDate: new Date().toISOString(),
                        paidAmount: overrideFees ?? defaultFees,
                    }
                )
                .subscribe((res) => {
                    if (!res) return resolve(false);
                    resolve(true);
                });
        });
    }
}
