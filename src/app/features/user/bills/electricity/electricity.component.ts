import {Component, OnDestroy} from '@angular/core';
import Bill from "../_common/services/bill";
import BillsService from "../_common/services/bills.service";
import {TableColumns} from "@components/table/table";
import NavColorChanger from "../../../_global/ui/navColorChanger";
import {environment} from "../../../../../environments/environment";
import {UserType} from "../../../_global/auth/_common/models/user";

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent implements OnDestroy {
  data: Array<Bill> = [];
  loading = false;
  navColorChanger: NavColorChanger;

  constructor(private billsService: BillsService) {
    this.loading = true;
    this.fetchData().then(() => (this.loading = false));

    this.navColorChanger = new NavColorChanger(
      environment.navRoutes[UserType.Customer][1]["background"],
      environment.navRoutes[UserType.Customer][1]["color"]
    );
    this.navColorChanger.changeColor();

  }

  get billsColumns(): TableColumns {
    return this.billsService.columns;
  }

  async fetchData() {
    this.data = await this.billsService.getAll("electricity");
  }

  ngOnDestroy(): void {
    this.navColorChanger.resetColor();
  }
}
