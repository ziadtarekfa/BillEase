import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getBills() {
    console.log("hello");
    return this.db.list('/users/QrZknwIhjTUfLc64yYjOx0F0PF53/bills').valueChanges();
  }
}
