import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  db: DatabaseService;
  constructor(private database: DatabaseService) {
    this.db = this.database;
  }

  ngOnInit() {
    console.log("Started ngInit");
    this.db.getBills().subscribe((user) => {
      console.log(user);
    });

  }

  // async fun() {
  //   await this.db.getBills();
  // }
}
