import { Component } from "@angular/core";
import { PasswordService } from "./password.service";

@Component({
    selector: "app-password",
    templateUrl: "./password.component.html",
    styleUrls: ["./password.component.css"],
})
export class PasswordComponent {
    constructor(private readonly passwordService: PasswordService) {
        passwordService.resetPassword("Aw@123123", "Aw123123").then(() => {
            console.log("changed");
        });
    }
}
