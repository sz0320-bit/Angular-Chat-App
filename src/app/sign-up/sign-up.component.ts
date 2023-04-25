import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../reducers";
import {MatSnackBar} from "@angular/material/snack-bar";
import {setUser} from "../reducers/user-reducer/user.actions";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  loading = false;
  showPass = false;

  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, private store: Store<State>, private snackbar: MatSnackBar) {
    this.signUpForm = this.createForm();
  }

  private createForm() {
    return this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'),
      ]],
      email: ['', [Validators.required, Validators.email]],
    })
  }


  register() {
    const {username, password, email} = this.signUpForm.value;
    const credentials = {username, password, email};
    this.loading = true;
    this.auth.register(credentials)
      .subscribe({
        next: result => {
          this.loading = false;
          if (result.username) {
            this.signUpForm.reset();
            this.signUpForm.markAsPristine();
            this.snackbar.open('Successfully Registered!', 'dismiss', {duration: 3000})
            this.router.navigate(['/login'], {
              queryParams: {
                username: username
              }
            });
          }
        },
        error: () => {
          this.loading = false;
          this.snackbar.open('There was an error registering, please retry', 'dismiss', {duration: 3000})
        }
      });
  }
}
