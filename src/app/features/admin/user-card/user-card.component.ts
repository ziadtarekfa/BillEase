import { Component, Input } from '@angular/core';
import Customer from "../_common/models/user";
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() customer?: Customer;
}
