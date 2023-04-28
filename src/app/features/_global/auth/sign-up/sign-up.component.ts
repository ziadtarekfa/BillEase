import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../_common/services/auth.service";

@Component({
    selector: "app-sign-up",
    templateUrl: "./sign-up.component.html",
    styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
    myForm: FormGroup;
    auth: AuthService;

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.auth = authService;
        this.myForm = this.fb.group({
            name: ["", [Validators.required]],
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                    ),
                ],
            ],
            phoneNo: ["", [Validators.required]],
            password: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
                    ),
                ],
            ],
        });
    }

    private getName() {
        return this.myForm.get("name")?.value;
    }

    private getEmail() {
        return this.myForm.get("email")?.value;
    }

    private getPassword() {
        return this.myForm.get("password")?.value;
    }

    private getPhoneNo() {
        return this.myForm.get("phoneNo")?.value;
    }

    signUp() {
        const name = this.getName();
        const password = this.getPassword();
        const email = this.getEmail();
        const phone = this.getPhoneNo();

        this.auth.signUp(email, password, { name, phone });
    }
}
