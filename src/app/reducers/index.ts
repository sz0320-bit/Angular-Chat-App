import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer,} from '@ngrx/store';
import {isDevMode} from "@angular/core";
import {User} from "../models/user.model";
import * as user from './user-reducer/user.reducer'


export interface State {
  user: user.State;
}

export const reducers: ActionReducerMap<State> = {
  user: user.reducer
};

export const userState = createFeatureSelector<user.State>(user.userFeatureKey);

export const getUserState = createSelector(
  userState,
  state => state.user
)

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
