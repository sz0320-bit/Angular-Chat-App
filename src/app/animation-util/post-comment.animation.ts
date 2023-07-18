import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Route1 => Route2', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateX(100%)' })  // New screen starts from the right side
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms ease-out', style({ opacity: 0 }))  // Old screen fades out
        ]),
        query(':enter', [
          animate('300ms ease-in', style({ transform: 'translateX(0%)' }))  // New screen moves from right to left
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Route2 => Route1', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateX(-100%)' })  // New screen starts from the left side
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms ease-out', style({ opacity: 0 }))  // Old screen fades out
        ]),
        query(':enter', [
          animate('300ms ease-in', style({ transform: 'translateX(0%)' }))  // New screen moves from left to right
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);