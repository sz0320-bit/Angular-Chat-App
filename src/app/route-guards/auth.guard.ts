import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {map, Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import {getUserState} from "../reducers";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getUserState).pipe(
      map(userState => {
        if (userState) {
          return true;
        } else {
          this.router.navigate(['/login']);
          // redirect to login page or other unauthorized page
          return false;
        }
      })
    );
  }

}
