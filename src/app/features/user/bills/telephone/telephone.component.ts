import { Component, OnDestroy } from "@angular/core";
import Bill from "../_common/services/bill";
import BillsService from "../_common/services/bills.service";
import { TableColumns } from "@components/table/table";
import { Router } from "@angular/router";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";
import { doc } from "@angular/fire/firestore";
import NavColorChanger from "../../../_global/ui/navColorChanger";
import { environment } from "../../../../../environments/environment";
import { UserType } from "../../../_global/auth/_common/models/user";

@Component({
    selector: "app-telephone",
    templateUrl: "./telephone.component.html",
    styleUrls: ["./telephone.component.css"],
})
export class TelephoneComponent implements OnDestroy {
    data: Array<Bill> = [];
    loading = false;
    telephoneOffer: any;
    navColorChanger: NavColorChanger;

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
            this.telephoneOffer = user.profile.telephoneOffer;

            this.fetchData().then(() => {
                this.loading = false;
            });
        });

        this.navColorChanger = new NavColorChanger(
            environment.navRoutes[UserType.Customer][2]["background"],
            environment.navRoutes[UserType.Customer][2]["color"]
        );
        this.navColorChanger.changeColor();
    }

    get billsColumns(): TableColumns {
        return this.billsService.columns;
    }

    async fetchData() {
        this.data = await this.billsService.getAll("telephone");
    }

    ngOnDestroy(): void {
        this.navColorChanger.resetColor();
    }
}
