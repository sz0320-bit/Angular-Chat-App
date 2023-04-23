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
