import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  db: DatabaseService;
  billsList: any;

  constructor(private database: DatabaseService) {
    this.db = this.database;
  }

  ngOnInit() {
    this.db.getBills()
      .subscribe((data) => {
        this.billsList = data;
      });
  }
}