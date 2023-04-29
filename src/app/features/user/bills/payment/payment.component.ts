import { Component, OnChanges, SimpleChanges } from "@angular/core";
import BillsService from "../_common/services/bills.service";
import Bill from "../_common/services/bill";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import User from "../../../_global/auth/_common/models/user";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";

@Component({
    selector: "app-payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.css"],
})
export class PaymentComponent {
    bill?: Bill;
    user?: User;
    id: string;
    successfulPayment$ = new BehaviorSubject(false);

    constructor(
        private readonly billsService: BillsService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
        this.id = (this.route.params as BehaviorSubject<any>).getValue().id;
        this.fetchBill();
        this.successfulPayment$.subscribe((paymentDone) => {
            if (paymentDone) {
                let newRoute = this.bill?.type ?? "";

                setTimeout(() => this.router.navigate([newRoute]), 2000);
            }
        });
    }

    async fetchBill() {
        this.bill = await this.billsService.getById(this.id);
        this.authService.currentUser.subscribe((user) => {
            this.user = user?.profile;
        });
    }

    async confirmPayment() {
        this.successfulPayment$.next(await this.billsService.pay(this.id));
    }
}
