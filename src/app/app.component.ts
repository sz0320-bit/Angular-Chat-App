import {Component, HostListener, OnInit} from '@angular/core';
import {getUserState, State} from "./reducers";
import {Store} from "@ngrx/store";
import {setUser} from "./reducers/user-reducer/user.actions";
import {Router, RouterOutlet} from "@angular/router";
import { slideInAnimation } from './animation-util/post-comment.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    //...
  ]
})

export class AppComponent implements OnInit{
  public getScreenWidth: any;
  public getScreenHeight: any;
  object = Object;
  selected = '';
  user$ = this.store.select(getUserState)


  constructor(private store: Store<State>, private router: Router) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  async ngOnInit() {



    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;


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
