import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from './file.reducer';

export const selectFileState = createFeatureSelector<FileState>('files');

export const selectAllFiles = createSelector(
  selectFileState,
  (state: FileState) => state.files
);

export const selectFileCount = createSelector(
  selectAllFiles,
  (files) => files.length
);

export const selectValidFiles = createSelector(
  selectAllFiles,
  (files) => files.filter(file => file.isValid)
);

export const selectInvalidFiles = createSelector(
  selectAllFiles,
  (files) => files.filter(file => !file.isValid)
);

