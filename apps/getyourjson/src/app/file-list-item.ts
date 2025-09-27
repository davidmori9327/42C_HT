import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FileItem } from './store/file.model';

@Component({
  selector: 'app-file-list-item',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './file-list-item.html',
  styleUrls: ['./file-list-item.css']
})
export class FileListItemComponent {
  @Input() file!: FileItem;
  @Output() delete = new EventEmitter<FileItem>();

  onDelete() {
    this.delete.emit(this.file);
  }
}
