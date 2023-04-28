import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input('title') title = '';
  @Input('unitsUsed') unitsUsed = '';
  @Input('icon') icon = '';
  @Input('iconBackground') iconBackground = ''
}
