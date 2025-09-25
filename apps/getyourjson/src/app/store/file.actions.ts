import { createAction, props } from '@ngrx/store';
import { FileItem } from './file.model';

export const addFile = createAction(
  '[File] Add File',
  props<{ file: FileItem }>()
);

export const removeFile = createAction(
  '[File] Remove File',
  props<{ id: string }>()
);

export const loadFiles = createAction('[File] Load Files');

export const loadFilesSuccess = createAction(
  '[File] Load Files Success',
  props<{ files: FileItem[] }>()
);

