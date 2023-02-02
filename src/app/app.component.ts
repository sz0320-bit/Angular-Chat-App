import {Component, HostListener, OnInit} from '@angular/core';
import {getUserState, State} from "./reducers";
import {Store} from "@ngrx/store";
import {setUser} from "./reducers/user-reducer/user.actions";
import {Router} from "@angular/router";
import {SupabaseService} from "./services/supabase.service";
import {coerceStringArray} from "@angular/cdk/coercion";

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


  constructor(private store: Store<State>, private router: Router, private supabase: SupabaseService) {
  }

  ngOnInit() {



    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;



    this.supabase.authChanges((_, session) => {
      this.store.dispatch(setUser({user: session.user}))
    })


  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }


  logout() {
    this.store.dispatch(setUser({user: null}));
    localStorage.clear();
    this.supabase.signOut();
    this.router.navigate(['/login'])
  }

}
