import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">Confirm file deleting</span>
          <button type="button" class="close" (click)="onCancel()">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete the file «{{ filename }}»?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-light" (click)="onCancel()">Cancel</button>
          <button class="btn btn-primary" (click)="onConfirm()">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-delete-modal.css']
})
export class ConfirmDeleteModalComponent {
  @Input() filename: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
