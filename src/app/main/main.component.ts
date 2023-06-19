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
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  posts = signal([]);
  user = this.store.select(getUserState);
  userId;
  username;
  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private snackbar: MatSnackBar,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.fetchInitialData();
    this.user.subscribe((value) => {
      this.userId = value?.id;
      this.username = value?.username;
    });
  }

  isLikedByUser(post) {
    return post.likes?.some((like) => like.userId === this.userId);
  }

  isDisikedByUser(post) {
    return post.dislikes?.some((dislike) => dislike.userId === this.userId);
  }

  fetchInitialData() {
    this.mainService
      .getPosts()
      .pipe(
        catchError((err) => {
          this.snackbar.open(
            'Error while fetching posts, please retry!',
            'dismiss',
            {
              duration: 3000,
            }
          );
          return err;
        }),
        tap((value) => {
          console.log(value);
          this.posts.set(value as any);
        })
      )
      .subscribe();
  }

  openAddPostDialog() {
    this.dialog
      .open(AddPostDialog, {
        width: '70%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((value) => {
        console.log(value);
        if (value.description && value.title) {
          this.addPost(value.description, value.title);
        }
      });
  }

  addPost(description: string, title: string) {
    this.mainService
      .addPost(description, title)
      .pipe(
        catchError((err) => {
          this.snackbar.open(
            'Error while saving post, please retry!',
            'dismiss',
            {
              duration: 3000,
            }
          );
          return err;
        }),
        tap((value) => {
          console.log(value);
          this.snackbar.open('Post Added Successfully!', 'dismiss', {
            duration: 3000,
          });
          this.posts.update((posts) => [value, ...posts]);
        })
      )
      .subscribe();
  }

  likePost(id, index) {
    const userLiked = this.posts()[index].likes.some(
      (like) => like.userId === this.userId
    );
    const userDisliked = this.posts()[index].dislikes.some(
      (like) => like.userId === this.userId
    );

    if (userDisliked) {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        const likeIndex = post.dislikes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.dislikes as any[]).splice(likeIndex, 1);
        newPosts[postIndex] = post;
        return newPosts;
      });
    }

    if (userLiked) {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        const likeIndex = post.likes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.likes as any[]).splice(likeIndex, 1);
        newPosts[postIndex] = post;
        return newPosts;
      });
      this.removeLike(id);
    } else {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        post.likes.push({
          id: post.likes.length,
          userId: this.userId,
          username: this.username,
          temporary: true,
        });
        newPosts[postIndex] = post;
        return newPosts;
      });
      this.mainService
        .likePost(id)
        .pipe(
          catchError((err) => {
            this.snackbar.open(
              'Error while liking post, please retry!',
              'dismiss',
              {
                duration: 3000,
              }
            );
            return err;
          }),
          tap((value: any) => {
            console.log(value);
            this.posts.update((posts) => {
              let newPosts = posts;
              let postIndex = posts.findIndex((post) => post.id === value.id);
              newPosts[postIndex] = value;
              return newPosts;
            });
          })
        )
        .subscribe();
    }
  }

  removeLike(id) {
    this.mainService
      .removeLike(id)
      .pipe(
        catchError((err) => {
          this.snackbar.open(
            'Error while removing like from post, please retry!',
            'dismiss',
            {
              duration: 3000,
            }
          );
          return err;
        }),
        tap((value: any) => {
          console.log(value);
          this.posts.update((posts) => {
            let newPosts = posts;
            let postIndex = posts.findIndex((post) => post.id === value.id);
            newPosts[postIndex] = value;
            return newPosts;
          });
        })
      )
      .subscribe();
  }

  removeDislike(id) {
    this.mainService
      .removeDislike(id)
      .pipe(
        catchError((err) => {
          this.snackbar.open(
            'Error while removing dislike from post, please retry!',
            'dismiss',
            {
              duration: 3000,
            }
          );
          return err;
        }),
        tap((value: any) => {
          console.log(value);
          this.posts.update((posts) => {
            let newPosts = posts;
            let postIndex = posts.findIndex((post) => post.id === value.id);
            newPosts[postIndex] = value;
            return newPosts;
          });
        })
      )
      .subscribe();
  }

  dislikePost(id, index) {
    const userDisliked = this.posts()[index].dislikes.some(
      (dislike) => dislike.userId === this.userId
    );
    const userLiked = this.posts()[index].likes.some(
      (dislike) => dislike.userId === this.userId
    );

    if (userLiked) {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        const likeIndex = post.likes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.likes as any[]).splice(likeIndex, 1);
        newPosts[postIndex] = post;
        return newPosts;
      });
    }

    if (userDisliked) {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        const likeIndex = post.dislikes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.dislikes as any[]).splice(likeIndex, 1);
        newPosts[postIndex] = post;
        return newPosts;
      });
      this.removeDislike(id);
    } else {
      this.posts.update((posts) => {
        let newPosts = posts;
        let postIndex = posts.findIndex((post) => post.id === id);
        let post = posts.find((post) => post.id === id);
        post.dislikes.push({
          id: post.likes.length,
          userId: this.userId,
          username: this.username,
          temporary: true,
        });
        newPosts[postIndex] = post;
        return newPosts;
      });
      this.mainService
        .dislikePost(id)
        .pipe(
          catchError((err) => {
            this.snackbar.open(
              'Error while disliking post, please retry!',
              'dismiss',
              {
                duration: 3000,
              }
            );
            return err;
          }),
          tap((value: any) => {
            console.log(value);
            this.posts.update((posts) => {
              let newPosts = posts;
              let postIndex = posts.findIndex((post) => post.id === value.id);
              newPosts[postIndex] = value;
              return newPosts;
            });
          })
        )
        .subscribe();
    }
  }
}
