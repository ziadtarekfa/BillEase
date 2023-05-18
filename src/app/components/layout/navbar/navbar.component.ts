import { Component, Input } from "@angular/core";
import { AuthService } from "../../../features/_global/auth/_common/services/auth.service";
import NavRoute from "@components/layout/navbar/nav-route";

@Component({
    selector: "app-nav",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
    @Input() navRoutes: Array<NavRoute> = [];
    isLogoutConfirm: boolean = false;

    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }

    closeDialog() {
        this.isLogoutConfirm = false;
    }

    openDialog() {
        this.isLogoutConfirm = true;
    }
}
