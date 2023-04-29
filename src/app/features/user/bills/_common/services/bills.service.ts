import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { AuthService } from "../../../../_global/auth/_common/services/auth.service";
import Bill from "./bill";

@Injectable({
    providedIn: "root",
})
export default class BillsService {
    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService
    ) {}

    columns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Title" },
        { field: "type", title: "Type" },
        { field: "amountFormatted", title: "Amount" },
        { field: "dueDateFormatted", title: "Due Date" },
        {
            field: "paymentDateFormatted",
            title: "Payment Status",
        },
    ];

    getAll(filter?: string): Promise<Array<Bill>> {
        return new Promise((resolve) => {
            this.authService.currentUser.subscribe((user) => {
                if (!user) return;
                const userId = user.profile?.id;
                this.http
                    .get(
                        `${
                            environment.baseUrl
                        }/bills/${userId}.json?print=pretty&orderBy="type"${
                            filter ? `&equalTo="${filter}"` : ""
                        }`
                    )
                    .subscribe((res) => {
                        if (!res) return;
                        const data = Object.entries(res).map(([id, value]) =>
                            Bill.fromDTO({ ...value, id })
                        );
                        resolve(data);
                    });
            });
        });
    }

    async getById(id: string): Promise<Bill> {
        return new Promise((resolve) => {
            this.authService.currentUser.subscribe((user) => {
                if (!user) return;
                const userId = user.profile?.id;
                this.http
                    .get(
                        `${environment.baseUrl}/bills/${userId}/${id}.json?print=pretty`
                    )
                    .subscribe((res) => {
                        if (!res) return;
                        const data = Bill.fromDTO({ ...res, id });
                        resolve(data);
                    });
            });
        });
    }

    async pay(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.currentUser.subscribe((user) => {
                if (!user) return;
                const userId = user.profile?.id;
                this.http
                    .patch(
                        `${environment.baseUrl}/bills/${userId}/${id}.json?print=pretty`,
                        {
                            paymentDate: new Date().toISOString(),
                            paid: true,
                        }
                    )
                    .subscribe((res) => {
                        if (!res) return;
                        resolve(true);
                    });
            });
        });
    }
}
