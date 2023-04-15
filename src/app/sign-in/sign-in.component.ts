import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  myForm: FormGroup;
  auth: AuthService;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.auth = authService;
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [
        Validators.required,
        // strong password pattern
        // Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
      ]]
    })
  }

  // ngOnInit() {
  //   this.myForm.valueChanges.subscribe(console.log);
  // }
  private getEmail() {
    return this.myForm.get('email')?.value;
  }
  private getPassword() {
    return this.myForm.get('password')?.value;
  }
  signIn() {
    // console.log(this.myForm.get('email'));
    console.log("Submitted Form");
    const email = this.getEmail();
    const password = this.getPassword();

    this.auth.signIn(email, password);

    // console.log(email + password);
    // console.log(this.myForm);
  }


}
