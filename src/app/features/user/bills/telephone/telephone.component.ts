import { Component } from "@angular/core";
import Bill from "../_common/services/bill";
import BillsService from "../_common/services/bills.service";
import { TableColumns } from "@components/table/table";
import { Router } from "@angular/router";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";

@Component({
    selector: "app-telephone",
    templateUrl: "./telephone.component.html",
    styleUrls: ["./telephone.component.css"],
})
export class TelephoneComponent {
    data: Array<Bill> = [];
    loading = false;

    constructor(
        private billsService: BillsService,
        private authService: AuthService,
        private router: Router
    ) {
        this.loading = true;
        this.authService.currentUser.subscribe((user) => {
            console.log(user);
            if (!user?.profile) return;
            if (!user.profile.telephoneOffer) {
                this.router.navigate(["/telephone-subscribe"]);
                return;
            }
            this.fetchData().then(() => {
                this.loading = false;
            });
        });
    }

    get billsColumns(): TableColumns {
        return this.billsService.columns;
    }

    async fetchData() {
        this.data = await this.billsService.getAll("telephone");
    }
}
