import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./features/auth/common/services/auth.service";
import { UserType } from "./features/auth/common/models/user";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "BillEase";

    disableLayout = false;
    readonly disableLayoutRoutes = ["/signin", "/signup"];

    userType?: UserType;

    constructor(private authService: AuthService, private router: Router) {
        authService.currentUser.subscribe((user) => {
            this.userType = user?.type ?? UserType.UnAuthenticated;
            this.handleAuthRouteChange(router);
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
}
