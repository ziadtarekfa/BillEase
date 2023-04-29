import { Component } from '@angular/core';
import Bill from '../../user/bills/_common/services/bill';
import BillsService from '../../user/bills/_common/services/bills.service';
import { TableColumns, TableData } from "@components/table/table";
import { AddBillModalComponent } from '../add-bill-modal/add-bill-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
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
    this.data = await this.billsService.getAll();
  }
  addBill() {
    console.log("you clicked");
  }
}
