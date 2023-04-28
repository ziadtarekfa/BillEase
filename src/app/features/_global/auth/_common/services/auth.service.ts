import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject } from "rxjs";
import User, { UserType } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private readonly fireAuth: AngularFireAuth,
        private readonly db: AngularFireDatabase,
        private readonly router: Router
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
            phone?: string;
        },
        isAdmin: boolean = false
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
            await this.db.object(`/users/${uid}`).set({
                ...data,
                email: email,
                bills: [],
                userType: isAdmin ? UserType.Admin : UserType.Customer,
            });

            await this.router.navigate([""]);
        } catch (e) {
            console.log(e);
        }
    }

    get currentUser() {
        const subject = new BehaviorSubject<{
            type: UserType;
            profile?: User;
        } | null>(null);
        this.fireAuth.user.subscribe((authUser) => {
            const uid = authUser?.uid;
            if (uid) {
                const userRef = this.db.object(`/users/${uid}`);
                userRef.valueChanges().subscribe((userEntry: any) => {
                    const user = new User(
                        uid,
                        authUser?.email ?? "",
                        authUser?.displayName ?? "",
                        userEntry?.phone ?? "",
                        userEntry.userType
                    );
                    subject.next({ type: userEntry.userType, profile: user });
                });
            } else {
                subject.next({ type: UserType.UnAuthenticated });
            }
        });
        return subject;
    }

    logout() {
        this.fireAuth.signOut();
        this.router.navigate(["/signin"]);
    }
}
