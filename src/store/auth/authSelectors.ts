import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

const selectRoot = (state: RootState) => state;

export const userSelector = createSelector(selectRoot, (state) => state.auth.user);
