import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../models/login-response";
import {Observable} from "rxjs";
import {RegisterResponse} from "../models/register-response";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(credentials: {username: string, password: string}): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  register(credentials: {username: string, password: string, email: string}): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.baseUrl}/users`, credentials);
  }


  signOut() {
  }

}
