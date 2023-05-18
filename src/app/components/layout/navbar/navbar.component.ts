import { Component, Input } from "@angular/core";
import { AuthService } from "../../../features/_global/auth/_common/services/auth.service";
import NavRoute from "@components/layout/navbar/nav-route";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-nav",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
    @Input() navRoutes: Array<NavRoute> = [];
    isLogoutConfirm: boolean = false;
    password: string = "";
    loading: boolean = false;
    error: string = "";

    constructor(private authService: AuthService, private router: Router) {}

    async logout() {
        try {
            this.loading = true;
            const isSuccess = await this.authService.logout(this.password);
            this.loading = false;
        } catch (e) {
            this.error = "Password Doesn't Match";
        }
    }

    closeDialog() {
        this.isLogoutConfirm = false;
        this.router.navigate([""]);
    }

    openDialog() {
        this.isLogoutConfirm = true;
    }
}
