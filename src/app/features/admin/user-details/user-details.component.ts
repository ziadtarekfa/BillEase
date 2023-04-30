import { Component } from "@angular/core";
import Bill from "../../user/bills/_common/services/bill";
import { TableActions, TableColumns, TableData } from "@components/table/table";
import { AddBillModalComponent } from "../add-bill-modal/add-bill-modal.component";
import Customer from "../_common/models/user";
import CustomersService from "../_common/services/customers.service";
import BillsService from "../../user/bills/_common/services/bills.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import PaymentService from "../../_global/auth/_common/services/payment/payment.service";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent {
    customer?: Customer;
    bills: Array<Bill> = [];
    pendingBills: Array<Bill> = [];
    loading = false;
    id: string;
    isDialogOpen = false;
    selectedBill$ = new BehaviorSubject<Bill | undefined>(undefined);
    selectedTotalFees = 0;
    actions: TableActions = [
        {
            disable: (row) => row["paid"],
            type: "button",
            text: "Receive Payment",
            onClick: (row) => {
                this.selectedBill$.next(row as Bill);
            },
        },
    ];

    constructor(
        private readonly customersService: CustomersService,
        private readonly billsService: BillsService,
        private readonly paymentService: PaymentService,
        private readonly route: ActivatedRoute
    ) {
        this.id = (this.route.params as BehaviorSubject<any>).getValue().userId;
        this.loading = true;
        this.fetchData().then(() => (this.loading = false));

        this.selectedBill$.subscribe((bill) => {
            if (!bill) return;
            this.isDialogOpen = true;
            this.paymentService
                .calculateFees(bill, 100)
                .then((totalFees) => (this.selectedTotalFees = totalFees));
        });
    }

    get billsColumns(): TableColumns {
        return this.billsService.columns;
    }

    async fetchData() {
        this.customer = await this.customersService.getById(this.id);
        this.bills = this.customer?.bills ?? [];
        this.pendingBills = this.bills.filter((bill) => !bill.paid);
    }

    addBill() {
        console.log("you clicked");
        this.isDialogOpen = true
    }

    onDialogClose() {
        this.isDialogOpen = false;
    }
}
