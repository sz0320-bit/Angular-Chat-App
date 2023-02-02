import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: User | null
}

export const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, {user}) => ({
    ...state,
    user
  })),
);
