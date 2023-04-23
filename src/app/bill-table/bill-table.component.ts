import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent {

  @Input() bills: any = [];
}
