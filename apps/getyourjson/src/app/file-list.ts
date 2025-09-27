

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileUploadModalComponent } from './file-upload-modal';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal';
import { FileListItemComponent } from './file-list-item';
import { FileItem } from './store/file.model';
import { selectAllFiles } from './store/file.selectors';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModalComponent, ConfirmDeleteModalComponent, FileListItemComponent],
  templateUrl: './file-list.html',
  styleUrls: ['./file-list.css'],
})
export class FileList {
  page = 1;
  files$: Observable<FileItem[]>;
  showUploadModal = signal(false);
  showDeleteModal = signal(false);
  fileToDelete: FileItem | null = null;

  constructor(private store: Store) {
    this.files$ = this.store.select(selectAllFiles);
  }

  getPagedFiles(files: FileItem[]): FileItem[] {
    return files;
  }

  totalPages(files: FileItem[]): number {
    return 1;
  }

  setPage(page: number, files: FileItem[]): void {
    const total = this.totalPages(files);
    if (page >= 1 && page <= total) {
      this.page = page;
    }
  }

  openUploadModal() {
    this.showUploadModal.set(true);
  }

  closeUploadModal() {
    this.showUploadModal.set(false);
  }

  confirmDelete(file: FileItem) {
    this.fileToDelete = file;
    this.showDeleteModal.set(true);
  }

  onDeleteConfirm() {
    if (this.fileToDelete) {
      this.store.dispatch({ type: '[File] Remove File', id: this.fileToDelete.id });
    }
    this.showDeleteModal.set(false);
    this.fileToDelete = null;
  }

  onDeleteCancel() {
    this.showDeleteModal.set(false);
    this.fileToDelete = null;
  }
}
