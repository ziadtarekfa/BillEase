import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {



  constructor(private db: AngularFireDatabase) { }

  // async getStarted() {
  //   await this.getBills().then(value => {
  //     console.log(value); 
  //   })
  // }

  getBills() {
    console.log("hello");

    return this.db.list('/users').valueChanges();


    // this.db.list('/users').valueChanges().subscribe((users) => {
    //   return users
    // })

    // return new Promise((resolve, reject) => {
    //   this.db.list('users').valueChanges().subscribe((value) => {
    //     resolve(value);
    //   });
    // });



  }
}
