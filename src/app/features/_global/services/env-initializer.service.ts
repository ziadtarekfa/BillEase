import { AuthService } from "../auth/_common/services/auth.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export default class EnvInitializerService {
    constructor(
        private readonly authService: AuthService,
        private readonly db: AngularFireDatabase
    ) {}

    public async initialize() {
        // await this.initializeAdmin();
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

    async initializeBills() {
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/el-1`).set({
            name: "Bill 1",
            amount: 100,
            dueDate: new Date(),
            paid: false,
            type: "electricity",
        });
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/el-2`).set({
            name: "Bill 2",
            amount: 500,
            dueDate: new Date(),
            paid: false,
            type: "electricity",
        });
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/tel-3`).set({
            name: "Bill 3",
            amount: 200,
            dueDate: new Date(),
            paid: false,
            type: "telephone",
        });
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/tel-4`).set({
            name: "Bill 4",
            amount: 150,
            dueDate: new Date(),
            paid: false,
            type: "telephone",
        });
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/wr-5`).set({
            name: "Bill 5",
            amount: 200,
            dueDate: new Date(),
            paid: false,
            type: "water",
        });
        await this.db.object(`/bills/KaV95x0N0uYYGZ5nmJAVm7fKP3x1/wr-6`).set({
            name: "Bill 6",
            amount: 150,
            dueDate: new Date(),
            paid: false,
            type: "water",
        });
    }
}
