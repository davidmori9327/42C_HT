import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFileCount } from './store/file.selectors';
import { loadFiles } from './store/file.actions';
import { FileUploadModalComponent } from './file-upload-modal';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, RouterModule, FileUploadModalComponent],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css'],
})
export class Welcome implements OnInit {
  fileCount$: Observable<number>;
  showUploadModal = signal(false);

  constructor(private store: Store) {
    this.fileCount$ = this.store.select(selectFileCount);
  }

  ngOnInit() {
    this.store.dispatch(loadFiles());
  }

  openUploadModal() {
    this.showUploadModal.set(true);
  }

  closeUploadModal() {
    this.showUploadModal.set(false);
  }
}
