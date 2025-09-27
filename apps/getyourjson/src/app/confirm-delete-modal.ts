import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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
          <button type="button" class="btn-close" (click)="onCancel()">×</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete the file «{{ filename }}»?</p>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="onCancel()">Cancel</button>
          <button class="btn-confirm" (click)="onConfirm()">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-delete-modal.css']
})
export class ConfirmDeleteModalComponent implements OnInit, OnDestroy {
  @Input() filename: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    document.body.classList.add('modal-open');
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }

  onConfirm() {
    document.body.classList.remove('modal-open');
    this.confirm.emit();
  }

  onCancel() {
    document.body.classList.remove('modal-open');
    this.cancel.emit();
  }
}
