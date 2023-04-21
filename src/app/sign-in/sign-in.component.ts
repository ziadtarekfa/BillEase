import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

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
      ]]
    })
  }

  private getEmail() {
    return this.myForm.get('email')?.value;
  }
  private getPassword() {
    return this.myForm.get('password')?.value;
  }
  signIn() {
    const email = this.getEmail();
    const password = this.getPassword();
    this.auth.signIn(email, password);
  }


}
