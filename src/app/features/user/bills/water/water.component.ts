import { Component } from "@angular/core";
import Bill from "../_common/services/bill";
import BillsService from "../_common/services/bills.service";
import { TableColumns } from "@components/table/table";

@Component({
    selector: "app-water",
    templateUrl: "./water.component.html",
    styleUrls: ["./water.component.css"],
})
export class WaterComponent {
    data: Array<Bill> = [];
    loading = false;

    constructor(private billsService: BillsService) {
        this.loading = true;
        this.fetchData().then(() => (this.loading = false));
    }

    get billsColumns(): TableColumns {
        return this.billsService.columns;
    }

    async fetchData() {
        this.data = await this.billsService.getAll("water");
    }
}
