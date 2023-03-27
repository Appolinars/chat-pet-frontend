import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

const selectRoot = (state: RootState) => state;

export const userSelector = createSelector(selectRoot, (state) => state.auth.user);
export const userLoadingSelector = createSelector(selectRoot, (state) => state.auth.isLoading);
export const isCheckingAuthSelector = createSelector(selectRoot, (state) => state.auth.isCheckingAuth);
export const authSuccessSelector = createSelector(
  selectRoot,
  (state) => state.auth.checkAuthSuccess
);
export const authErrorSelector = createSelector(selectRoot, (state) => state.auth.checkAuthError);
