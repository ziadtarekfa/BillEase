import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";
import { environment } from "../../../../../environments/environment";
import Customer from "../models/user";
import Bill from "../../../user/bills/_common/services/bill";
import { TableColumns } from "@components/table/table";

@Injectable({
    providedIn: "root",
})
export default class CustomersService {
    constructor(private readonly http: HttpClient) {}

    columns: TableColumns = [
        {
            field: "id",
            title: "User ID",
        },
        {
            field: "name",
            title: "Name",
        },
        {
            field: "email",
            title: "Email",
        },
        {
            field: "phone",
            title: "Phone",
        },
    ];

    getAll(): Promise<Array<Customer>> {
        return new Promise((resolve) => {
            this.http
                .get(
                    `${environment.baseUrl}/users.json?print=pretty&orderBy="userType"&equalTo="customer"`
                )
                .subscribe((res) => {
                    if (!res) return;
                    const data: Array<Customer> = Object.entries(res).map(
                        ([id, value]) => Customer.fromDTO({ id, ...value })
                    );
                    resolve(data);
                });
        });
    }

    getById(id: string): Promise<Customer> {
        return new Promise((resolve) => {
            this.http
                .get(`${environment.baseUrl}/users/${id}.json?print=pretty`)
                .subscribe((user) => {
                    if (!user) return;
                    this.http
                        .get(
                            `${environment.baseUrl}/bills/${id}.json?print=pretty`
                        )
                        .subscribe((bills) => {
                            resolve(
                                Customer.fromDTO({
                                    id,
                                    ...user,
                                    bills: bills
                                        ? Object.entries(bills).map(
                                              ([id, value]) =>
                                                  Bill.fromDTO({ ...value, id })
                                          )
                                        : [],
                                })
                            );
                        });
                });
        });
    }
}
