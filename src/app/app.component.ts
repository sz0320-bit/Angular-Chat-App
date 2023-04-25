import {Component, HostListener, OnInit} from '@angular/core';
import {getUserState, State} from "./reducers";
import {Store} from "@ngrx/store";
import {setUser} from "./reducers/user-reducer/user.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  public getScreenWidth: any;
  public getScreenHeight: any;
  object = Object;
  selected = '';
  user$ = this.store.select(getUserState)


  constructor(private store: Store<State>, private router: Router) {
  }

  async ngOnInit() {



    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    // const localExpirationTime = localStorage.getItem('expirationTime');
    // const expirationTime = new Date(localExpirationTime);
    // if (localExpirationTime) {
    //   // console.log('exp', expirationTime);
    //   const currentTime = Date.now();
    //   const remainingTime = (expirationTime.getTime() - currentTime) / 1000;
    //
    //   if (remainingTime <= 0) {
    //     // console.log('checker');
    //     this.snackbar.open('Session Expired, Please Login Again', 'dismiss');
    //     this.logout();
    //   } else {
    //     // console.log(remainingTime);
    //
    //     this.startSessionExpiryCountdown(remainingTime);
    //   }
    // }

    const accessExpireTime = localStorage.getItem('refresh_in');
    const refreshExpireTime = localStorage.getItem('expires_in');

    if(accessExpireTime && refreshExpireTime){
      const access = new Date(accessExpireTime);
      const refresh = new Date(refreshExpireTime);
      const remainingTime = (access.getTime() - Date.now()) / 1000;
      const expireTime = (refresh.getTime() - Date.now()) / 1000;
      if(remainingTime <= 0 || expireTime <= 0){
        this.logout();
      }
    }else{
      this.logout();
    }

    const user = localStorage.getItem('user');

    if(user){
      this.store.dispatch(setUser({User: JSON.parse(user)}))
    }





  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }


  logout() {
    this.store.dispatch(setUser({User: null}));
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
