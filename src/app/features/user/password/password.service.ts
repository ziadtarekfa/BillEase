import { Injectable } from "@angular/core";
import { AuthService } from "../../_global/auth/_common/services/auth.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: "root",
})
export class PasswordService {
    constructor(private readonly fireAuth: AngularFireAuth) {}

    async resetPassword(oldPassword: string, newPassword: string) {
        const oldUser = await this.fireAuth.currentUser;
        const res = await this.fireAuth.signInWithEmailAndPassword(
            oldUser?.email ?? "",
            oldPassword
        );
        res.user?.updatePassword(newPassword);
        // currentUser?.updatePassword("Aw123123");
    }
}
