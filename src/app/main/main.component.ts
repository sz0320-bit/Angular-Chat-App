import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialog } from './add-post-dialog/add-post-dialog.component';
import { MainService } from '../services/main.service';
import { catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { State, getUserState } from '../reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  posts = signal([]);
  user = this.store.select(getUserState);
  userId;
  constructor(private dialog: MatDialog, private mainService: MainService, private snackbar: MatSnackBar, private store: Store<State>){
  }

  ngOnInit(){
    this.fetchInitialData();
    this.user.subscribe(value => {
      this.userId = value?.id;
    })
  }

  isLikedByUser(post){
    return post.likes?.some(like => like.userId === this.userId);
  }

  fetchInitialData(){
    this.mainService.getPosts()
    .pipe(
      catchError(err => {
        this.snackbar.open('Error while fetching posts, please retry!', 'dismiss', {
          duration: 3000,
        });
        return err;
      }),
      tap(value => {
        console.log(value);
        this.posts.set(value as any)
      }),
    )
    .subscribe();
  }

  openAddPostDialog(){
    this.dialog.open(AddPostDialog, {
      width: '70%',
      disableClose: true,
    }).afterClosed().subscribe(value => {
      console.log(value);
      if(value.description && value.title){
        this.addPost(value.description, value.title);
      }
    });
  }

  addPost(description: string, title: string){
    this.mainService.addPost(description, title)
    .pipe(
      catchError(err => {
        this.snackbar.open('Error while saving post, please retry!', 'dismiss', {
          duration: 3000,
        });
        return err;
      }),
      tap(value => {
        console.log(value);
        this.snackbar.open('Post Added Successfully!', 'dismiss', {
          duration: 3000,
        });
        this.posts.update(posts => [...posts, value]);
      }),
    )
    .subscribe();
  }

  likePost(id){
    this.mainService.likePost(id).pipe(
      catchError(err => {
        this.snackbar.open('Error while liking post, please retry!', 'dismiss', {
          duration: 3000,
        });
        return err;
      }),
      tap(value => {
        console.log(value);
      }),
    )
    .subscribe();
  }
}
