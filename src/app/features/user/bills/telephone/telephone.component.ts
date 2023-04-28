import { Component } from '@angular/core';
import Bill from "../_common/services/bill";
import BillsService from "../_common/services/bills.service";
import {TableColumns} from "@components/table/table";

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css']
})
export class TelephoneComponent {
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
    this.data = await this.billsService.getAll("telephone");
  }
}
