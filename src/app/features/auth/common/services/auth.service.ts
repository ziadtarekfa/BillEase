import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import User, { UserType } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private fireAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router
    ) {}

    signIn(email: string, password: string) {
        this.fireAuth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem("token", "true");
                this.router.navigate([""]);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    async signUp(
        email: string,
        password: string,
        data: {
            name: string;
            phone: string;
        }
    ) {
        try {
            const res = await this.fireAuth.createUserWithEmailAndPassword(
                email,
                password
            );
            const uid = res.user?.uid;
            if (!uid) return;

            const user = await this.fireAuth.currentUser;
            user?.updateProfile({
                displayName: data.name,
            });
            await this.db.object(`/customers/${uid}`).set({
                ...data,
                email: email,
                bills: [],
            });

            await this.router.navigate([""]);
        } catch (e) {
            console.log(e);
        }
    }

    get currentUser() {
        return new Observable<User | null>((sub) => {
            this.fireAuth.user.subscribe((authUser) => {
                const uid = authUser?.uid;
                console.log({ uid });
                if (uid) {
                    const userRef = this.db.object(`/customers/${uid}`);
                    userRef.valueChanges().subscribe((userEntry: any) => {
                        const user = new User(
                            uid,
                            authUser?.email ?? "",
                            authUser?.displayName ?? "",
                            userEntry?.phone ?? "",
                            UserType.Customer
                        );
                        sub.next(user);
                    });
                } else {
                    sub.next(null);
                }
            });
        });
    }

    logout() {
        this.fireAuth.signOut();
        this.router.navigate(["/signin"]);
    }
}
