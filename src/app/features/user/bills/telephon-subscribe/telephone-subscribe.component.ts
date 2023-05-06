import { Component } from "@angular/core";
import ServiceProvidersService from "../../../admin/telephone-config/service-providers/service-providers.service";
import { BehaviorSubject } from "rxjs";
import ServiceProvider from "../../../admin/telephone-config/service-providers/service-provider";
import TelephoneConfigService from "../telephone/telephone-config.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";

@Component({
    selector: "app-telephone-subscribe",
    templateUrl: "./telephone-subscribe.component.html",
    styleUrls: ["./telephone-subscribe.component.css"],
})
export class TelephoneSubscribeComponent {
    serviceProviders$ = new BehaviorSubject<Array<ServiceProvider>>([]);
    allServiceProviders: Array<ServiceProvider> = [];
    loading = false;
    isSubscriptionSuccessful: boolean = false;

    constructor(
        private serviceProvidersService: ServiceProvidersService,
        private telephoneConfigService: TelephoneConfigService,
        private authService: AuthService,
        private router: Router
    ) {
        this.loading = true;
        this.fetchData().then(() => {
            this.loading = false;
        });
    }

    get serviceProviders() {
        return this.serviceProviders$.getValue();
    }

    async fetchData() {
        const allServiceProviders = await this.serviceProvidersService.getAll();
        this.allServiceProviders = allServiceProviders;
        this.serviceProviders$.next(allServiceProviders);
    }

    async subscribe(offer: object) {
        console.log(offer);
        await this.telephoneConfigService.subscribe(offer);
        this.isSubscriptionSuccessful = true;
        setTimeout(() => {
            this.router.navigate(["/telephone"]);
        }, 3000);
    }
}
