import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) {
  }


  getPosts(){
    return this.http.get(`${this.baseUrl}/posts`);
  }

  addPost(description: string, title: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/posts`, {desc: description, title: title});
  }

  likePost(id){
    return this.http.patch(`${this.baseUrl}/posts/${id}/like`, {});
  }


}
