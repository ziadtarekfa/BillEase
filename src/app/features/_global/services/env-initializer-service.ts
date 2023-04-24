import { AuthService } from "../../auth/common/services/auth.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export default class EnvInitializerService {
    constructor(
        private readonly authService: AuthService,
        private readonly db: AngularFireDatabase,
        private readonly router: Router
    ) {}

    public async initialize() {
        await this.initializeAdmin();
    }

    private async initializeAdmin() {
        await this.authService.signUp(
            "admin@admin.com",
            "admin@admin.com",
            {
                name: "Admin",
            },
            true
        );
    }
}
