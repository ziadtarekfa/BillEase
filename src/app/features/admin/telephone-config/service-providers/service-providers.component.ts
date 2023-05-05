import { Component } from "@angular/core";
import { TableActions, TableColumns } from "@components/table/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import ServiceProvidersService from "./service-providers.service";
import ServiceProvider from "./service-provider";

@Component({
    selector: "app-service-providers",
    templateUrl: "./service-providers.component.html",
    styleUrls: ["./service-providers.component.css"],
})
export class ServiceProvidersComponent {
    isAddServiceOpen: boolean = false;
    addServiceProviderForm: FormGroup;
    data: ServiceProvider[] = [];
    loading: boolean = false;
    serviceProvidersColumns: TableColumns = [
        {
            title: "#",
            field: "shortName",
        },
        {
            title: "ID",
            field: "id",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Pre-paid Offers",
            field: "prepaidOffersCount",
        },
        {
            title: "Post-paid Offers",
            field: "postpaidOffersCount",
        },
    ];
    actions: TableActions = [
        {
            type: "link",
            link: (row: any) => `/admin/service-providers/${row.id}`,
            text: "View",
        },
    ];

    constructor(
        private readonly fb: FormBuilder,
        private readonly serviceProvidersService: ServiceProvidersService
    ) {
        this.addServiceProviderForm = this.fb.group({
            name: ["", Validators.required],
        });

        this.loading = true;
        this.fetchServiceProviders().then(() => (this.loading = false));
    }

    onAddServiceClose() {
        this.isAddServiceOpen = false;
      this.addServiceProviderForm.reset();


    }

    onOpenAddService() {
        this.isAddServiceOpen = true;
    }

    async fetchServiceProviders() {
        this.data = await this.serviceProvidersService.getAll();
    }

    async addServiceProvider() {
        const name = this.addServiceProviderForm.get("name");
        const res = await this.serviceProvidersService.add({
            name: name?.value,
        });
        if (res) {
            await this.fetchServiceProviders();
            this.isAddServiceOpen = false;
            this.addServiceProviderForm.reset();
        }
    }
}
