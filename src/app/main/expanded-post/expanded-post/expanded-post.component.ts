import { Component, OnInit, effect, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { State, getUserState } from 'src/app/reducers';
import { MainService } from 'src/app/services/post.service';

@Component({
  selector: 'app-expanded-post',
  templateUrl: './expanded-post.component.html',
  styleUrls: ['./expanded-post.component.scss'],
})
export class ExpandedPostComponent implements OnInit {
  loading = signal(false);
  postId = signal(null);
  post = signal(null);
  user = this.store.select(getUserState);
  userId;
  username;
  commentControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private store: Store<State>
  ) {
    this.postId.set(this.route.snapshot.params['id']);

    this.user.subscribe((value) => {
      this.userId = value?.id;
      this.username = value?.username;
    });

    effect(() => {
      console.log(this.postId());
    });
  }

  ngOnInit(): void {
    this.loadPost(this.postId());
  }

  loadPost(id: number) {
    this.loading.set(true);
    this.mainService
      .getPostById(id)
      .pipe(
        catchError((err) => {
          console.log(err);
          this.loading.set(false);
          return err;
        }),
        tap((postRes) => {
          console.log(postRes);
          const post = postRes as any;
          this.loading.set(false);
          post.comments = post.comments.reverse();
          this.post.set(post);
        })
      )
      .subscribe();
  }

  isLikedByUser(post) {
    return post.likes?.some((like) => like.userId === this.userId);
  }

  isDisikedByUser(post) {
    return post.dislikes?.some((dislike) => dislike.userId === this.userId);
  }

  addComment() {
    const message = this.commentControl.value;
    this.mainService
      .addComment(this.postId(), message)
      .pipe(
        catchError((err) => {
          this.snackbar.open(
            'Error while adding comment, please retry!',
            'dismiss',
            {
              duration: 3000,
            }
          );
          return err;
        }),
        tap((value: any) => {
          console.log(value);
          this.post.update(post => {
            post.comments.unshift(value);
            this.commentControl.reset();
            return post;
          })
        })
      )
      .subscribe();
  }

  likePost(id) {
    const userLiked = this.post().likes.some(
      (like) => like.userId === this.userId
    );
    const userDisliked = this.post().dislikes.some(
      (like) => like.userId === this.userId
    );

    if (userDisliked) {
      this.post.update((post) => {
        const likeIndex = post.dislikes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.dislikes as any[]).splice(likeIndex, 1);
        return post;
      });
    }

    if (userLiked) {
      this.post.update((post) => {
        const likeIndex = post.likes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.likes as any[]).splice(likeIndex, 1);
        return post;
      });
      this.removeLike(id);
    } else {
      this.post.update((post) => {
        post.likes.push({
          id: post.likes.length,
          userId: this.userId,
          username: this.username,
          temporary: true,
        });
        return post;
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
            this.post.update((posts) => value);
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
          this.post.update((posts) => value);
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
          this.post.update((posts) => value);
        })
      )
      .subscribe();
  }

  dislikePost(id) {
    const userDisliked = this.post().dislikes.some(
      (dislike) => dislike.userId === this.userId
    );
    const userLiked = this.post().likes.some(
      (dislike) => dislike.userId === this.userId
    );

    if (userLiked) {
      this.post.update((post) => {
        const likeIndex = post.likes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.likes as any[]).splice(likeIndex, 1);

        return post;
      });
    }

    if (userDisliked) {
      this.post.update((post) => {
        const likeIndex = post.dislikes.findIndex(
          (like) => like.userId === this.userId
        );
        (post.dislikes as any[]).splice(likeIndex, 1);
        post;
      });
      this.removeDislike(id);
    } else {
      this.post.update((post) => {
        post.dislikes.push({
          id: post.likes.length,
          userId: this.userId,
          username: this.username,
          temporary: true,
        });
        return post;
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
          })
        )
        .subscribe();
    }
  }
}
