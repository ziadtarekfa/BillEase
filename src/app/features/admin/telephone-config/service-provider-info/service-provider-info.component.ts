import { Component } from "@angular/core";
import ServiceProvider from "../service-providers/service-provider";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableActions, TableColumns } from "@components/table/table";
import ServiceProvidersService from "../service-providers/service-providers.service";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-service-provider-info",
    templateUrl: "./service-provider-info.component.html",
    styleUrls: ["./service-provider-info.component.css"],
})
export class ServiceProviderInfoComponent {
    loading = false;
    serviceProvider?: ServiceProvider;
    isAddOfferOpen: boolean = false;
    addOfferForm: FormGroup;
    id: string;
    offersColumns: TableColumns = [
        {
            title: "ID",
            field: "id",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Details",
            field: (row: any) =>
                row.offerType === "prepaid"
                    ? `${row.units} units for ${row.unitsCost} EGP`
                    : `${row.costPerMinute} EGP per minute`,
        },
    ];
    actions: TableActions = [
        {
            type: "link",
            link: (row: any) => `/admin/service-providers/${row.id}`,
            text: "View",
        },
        {
            type: "button",
            onClick: (row: any) =>
                this.deleteOffer(
                    row.id,
                    this.serviceProvider?.id ?? "",
                    row.offerType
                ),
            text: "Delete",
        },
    ];

    constructor(
        private readonly fb: FormBuilder,
        private readonly serviceProvidersService: ServiceProvidersService,
        private readonly route: ActivatedRoute
    ) {
        this.id = (this.route.params as BehaviorSubject<any>).getValue().id;

        this.addOfferForm = this.fb.group({
            name: ["", Validators.required],
            offerType: ["", Validators.required],
            costPerMinute: [""],
            units: [""],
            unitsCost: [""],
        });

        this.loading = true;
        this.fetchServiceProvider().then(() => (this.loading = false));
    }

    get data() {
        return [
            ...(this.serviceProvider?.prepaidOffers ?? []),
            ...(this.serviceProvider?.postpaidOffers ?? []),
        ].sort((a, b) => a.id - b.id);
    }

    onAddServiceClose() {
        this.isAddOfferOpen = false;
        this.addOfferForm.reset();
    }

    onOpenAddOffer() {
        this.isAddOfferOpen = true;
    }

    async fetchServiceProvider() {
        this.serviceProvider = await this.serviceProvidersService.getById(
            this.id
        );
    }

    async addOffer() {
        const res = await this.serviceProvidersService.addOffer({
            serviceProviderId: this.id,
            name: this.addOfferForm.get("name")?.value,
            offerType: this.addOfferForm.get("offerType")?.value,
            costPerMinute: this.addOfferForm.get("costPerMinute")?.value,
            units: this.addOfferForm.get("units")?.value,
            unitsCost: this.addOfferForm.get("unitsCost")?.value,
        });
        if (res) {
            await this.fetchServiceProvider();
            this.isAddOfferOpen = false;
            this.addOfferForm.reset();
        }
    }

    async deleteOffer(
        id: string,
        serviceProviderId: string,
        offerType: string
    ) {
        await this.serviceProvidersService.deleteOffer(
            id,
            serviceProviderId,
            offerType
        );
        await this.fetchServiceProvider();
    }
}
