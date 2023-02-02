import { Component } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private supabase: SupabaseService) {
  }


  login(){
    this.supabase.signInWithGoogle();
  }
}
