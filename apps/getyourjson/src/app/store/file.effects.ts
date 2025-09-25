import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as FileActions from './file.actions';
import { FileStorageService } from '../services/file-storage.service';

@Injectable()
export class FileEffects {
  private actions$ = inject(Actions);
  private fileStorageService = inject(FileStorageService);

  addFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.addFile),
      tap(({ file }) => this.fileStorageService.saveFiles([file]))
    ),
    { dispatch: false }
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.removeFile),
      tap(({ id }) => this.fileStorageService.removeFile(id))
    ),
    { dispatch: false }
  );

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.loadFiles),
      map(() => {
        const files = this.fileStorageService.loadFiles();
        return FileActions.loadFilesSuccess({ files });
      })
    )
  );
}

