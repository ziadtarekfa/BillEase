import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    paymentForm: FormGroup;
    bill?: Bill;
    user?: User;
    id: string;
    successfulPayment$ = new BehaviorSubject(false);
    loading = false;

    constructor(
        private readonly billsService: BillsService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.id = (this.route.params as BehaviorSubject<any>).getValue().id;
        this.loading = true;
        this.fetchBill().then(() => (this.loading = false));
        this.successfulPayment$.subscribe((paymentDone) => {
            if (paymentDone) {
                let newRoute = this.bill?.type ?? "";

                setTimeout(() => this.router.navigate([newRoute]), 2000);
            }
        });
        this.paymentForm = this.fb.group({
            cardHolderName: ["", [Validators.required]],
            cardNumber: [
                "",
                [
                    // should start with 4 or 5 and can be 13 digits or 16 digits
                    Validators.required,
                    Validators.pattern("^[4-5][0-9]{12}(?:[0-9]{3})?$"),
                ],
            ],
            expiryDate: ["", [Validators.required]],
            // should be 3 or 4 digits
            cvv: [
                "",
                [Validators.required, Validators.pattern("^[0-9]{3,4}$")],
            ],
        });
    }

    async fetchBill() {
        this.bill = await this.billsService.getById(this.id);
        this.authService.currentUser.subscribe((user) => {
            this.user = user?.profile;
        });
    }

    async confirmPayment() {
        this.successfulPayment$.next(
            await this.billsService.pay(this.id, this.bill as Bill)
        );
    }
}
