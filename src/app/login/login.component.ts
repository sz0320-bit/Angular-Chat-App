import {Component, OnInit} from '@angular/core';
import {setUser} from "../reducers/user-reducer/user.actions";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {State} from "../reducers";
import {Store} from "@ngrx/store";
import {catchError, of, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loading = false;
  showPass = false;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private fb: FormBuilder, private store: Store<State>, private snackbar: MatSnackBar) {
    this.loginForm = this.createForm();
  }

  ngOnInit(){
    const username = this.route.snapshot.queryParamMap.get('username');
    if(username){
      this.loginForm.get('username').setValue(username);
    }
  }


  private createForm() {
    return this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }


  login() {
    const {username, password} = this.loginForm.value;
    const credentials = {username, password};
    this.loading = true;
    this.auth.login(credentials)
      .subscribe({
        next: result => {
          this.loading = false;
          if (result.body.access_token) {
            this.loginForm.reset();
            this.loginForm.markAsPristine();
            this.store.dispatch(setUser({User: result.body.user}));
            localStorage.setItem('accessToken', result.body.access_token);
            localStorage.setItem('user', JSON.stringify(result.body.user));
            localStorage.setItem('refreshToken', result.body.refresh_token);
            localStorage.setItem('refresh_in', result.body.refresh_in);
            localStorage.setItem('expires_in', result.body.expires_in);
            this.router.navigate(['/']);
          }
        },
        error: result => {
          this.loading = false;
          if(result.status === 401){
            this.snackbar.open('Invalid Credentials!', 'dismiss', {duration: 3000})
          }else{
            this.snackbar.open('There was an error logging you in, please retry', 'dismiss', {duration: 3000})
          }
        }
      });
  }
}
