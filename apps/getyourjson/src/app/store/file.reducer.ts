import { createReducer, on } from '@ngrx/store';
import { FileItem } from './file.model';
import * as FileActions from './file.actions';

export interface FileState {
  files: FileItem[];
}

export const initialState: FileState = {
  files: []
};

export const fileReducer = createReducer(
  initialState,
  on(FileActions.addFile, (state, { file }) => ({
    ...state,
    files: [...state.files, file]
  })),
  on(FileActions.removeFile, (state, { id }) => ({
    ...state,
    files: state.files.filter(file => file.id !== id)
  })),
  on(FileActions.loadFilesSuccess, (state, { files }) => ({
    ...state,
    files
  }))
);

