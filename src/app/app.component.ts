import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./features/auth/common/services/auth.service";
import { UserType } from "./features/auth/common/models/user";
import EnvInitializerService from "./features/_global/services/env-initializer-service";
import { environment } from "../environments/environment";
import NavRoute from "@components/layout/navbar/nav-route";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "BillEase";

    disableLayout = false;
    readonly disableLayoutRoutes = ["/signin", "/signup"];
  navRoutes: Array<NavRoute> = [];
    userType?: UserType;

    constructor(
        private readonly authService: AuthService,
        private readonly envInitializerService: EnvInitializerService,
        private readonly router: Router
    ) {
        authService.currentUser.subscribe((user) => {
            this.userType = user?.type;
            console.log({ type: this.userType });
            this.handleAuthRouteChange(router);
            this.setupNavRoutes();
        });
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.disableLayout = this.disableLayoutRoutes.includes(
                    event.url
                );
                this.handleAuthRouteChange(router);
            }
        });
    }

    handleAuthRouteChange(router: Router) {
        if (
            this.userType === UserType.UnAuthenticated &&
            !this.disableLayoutRoutes.includes(router.url)
        ) {
            router.navigate(["/signin"]);
        } else if (
            this.userType !== UserType.UnAuthenticated &&
            this.disableLayoutRoutes.includes(router.url)
        ) {
            router.navigate(["/"]);
        }
    }

    setupNavRoutes() {
        const userType = this.userType;
        if (!userType || userType === UserType.UnAuthenticated) return;

        this.navRoutes = environment.navRoutes[userType];
    }
}
