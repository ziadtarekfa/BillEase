import { Component } from "@angular/core";
import CustomersService from "../_common/services/customers.service";
import Customer from "../_common/models/user";
import { TableActions } from "@components/table/table";

@Component({
    selector: "app-dashboard-admin",
    templateUrl: "./dashboard-admin.component.html",
    styleUrls: ["./dashboard-admin.component.css"],
})
export class DashboardAdminComponent {
    customers: Array<Customer> = [];
    loading = false;
    actions: TableActions = [
        {
            link: (row) => `/admin/user-details/${row["id"]}`,
            type: "link",
            text: "View Details",
        },
    ];

    constructor(private readonly customersService: CustomersService) {
        this.loading = true;
        this.fetchCustomers().then(() => (this.loading = false));
    }

    async fetchCustomers() {
        this.customers = await this.customersService.getAll();
    }

    get customersColumns() {
        return this.customersService.columns;
    }
}
