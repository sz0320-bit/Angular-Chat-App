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

  getPostById(id: number){
    return this.http.get(`${this.baseUrl}/posts/${id}`);
  }

  addPost(description: string, title: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/posts`, {desc: description, title: title});
  }

  likePost(id){
    return this.http.patch(`${this.baseUrl}/posts/${id}/like`, {});
  }

  dislikePost(id){
    return this.http.patch(`${this.baseUrl}/posts/${id}/dislike`, {});
  }

  removeLike(id){
    return this.http.patch(`${this.baseUrl}/posts/${id}/removeLike`, {});
  }

  removeDislike(id){
    return this.http.patch(`${this.baseUrl}/posts/${id}/removeDislike`, {});
  }

  addComment(postId, message){
    return this.http.post(`${this.baseUrl}/comments`, {postId: postId, message: message});
  }
}
