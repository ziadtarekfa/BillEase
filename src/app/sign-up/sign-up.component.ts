import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  myForm: FormGroup;
  auth: AuthService;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.auth = authService;
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      phoneNumber: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],

    })
  }

  // ngOnInit() {
  //   this.myForm.valueChanges.subscribe(console.log);
  // }
  passwordConfirming(): boolean {
    if (this.getPassword() !== this.getConfirmedPassword()) {
      return true;
    }
    else {
      return false;
    }
  }
  private getEmail() {
    return this.myForm.get('email')?.value;
  }
  private getPassword() {
    return this.myForm.get('password')?.value;
  }
  private getConfirmedPassword() {
    return this.myForm.get('confirmPassword')?.value;
  }
  signIn() {
    // console.log(this.myForm.get('email'));
    console.log("Submitted Form");
    const email = this.getEmail();
    const password = this.getPassword();

    // this.auth.signIn(email, password);

    // console.log(email + password);
    console.log(this.myForm);
  }
}
