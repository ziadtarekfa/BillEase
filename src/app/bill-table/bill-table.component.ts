import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Bill from '../Bill';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent {

  @Input() bills: any = [];
}
