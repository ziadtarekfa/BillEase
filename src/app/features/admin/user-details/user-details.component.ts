import { Component } from "@angular/core";
import Bill from "../../user/bills/_common/services/bill";
import { TableColumns, TableData } from "@components/table/table";
import { AddBillModalComponent } from "../add-bill-modal/add-bill-modal.component";
import Customer from "../_common/models/user";
import CustomersService from "../_common/services/customers.service";
import BillsService from "../../user/bills/_common/services/bills.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";

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

    constructor(
        private readonly customersService: CustomersService,
        private readonly billsService: BillsService,
        private readonly route: ActivatedRoute
    ) {
        this.id = (this.route.params as BehaviorSubject<any>).getValue().userId;
        this.loading = true;
        this.fetchData().then(() => (this.loading = false));
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
    }
}
