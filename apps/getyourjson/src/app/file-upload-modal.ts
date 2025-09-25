import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addFile } from './store/file.actions';
import { FileItem } from './store/file.model';
import { JsonValidatorService } from './services/json-validator.service';

@Component({
  selector: 'app-file-upload-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './file-upload-modal.html',
  styleUrls: ['./file-upload-modal.css'],
})
export class FileUploadModalComponent {
  @Output() close = new EventEmitter<void>();

  public name = '';
  public description = '';
  public file: File | null = null;
  fileContent = '';
  
  // Remove signals, use regular arrays and booleans
  nameErrors: string[] = [];
  descriptionErrors: string[] = [];
  fileErrors: string[] = [];
  isSubmitting = false;

  constructor(
    private store: Store,
    private jsonValidator: JsonValidatorService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file extension
      if (!this.jsonValidator.validateFileExtension(file.name)) {
        this.fileErrors = ['Please select a JSON file (.json extension)'];
        this.file = null;
        return;
      }
      
      this.file = file;
      this.fileErrors = [];
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.fileContent = content;
      };
      reader.readAsText(file);
    }
  }

  validateForm(): boolean {
    let isValid = true;
    
    // Validate file name
    const nameValidation = this.jsonValidator.validateFileName(this.name);
    this.nameErrors = nameValidation.errors;
    if (!nameValidation.isValid) isValid = false;
    
    // Validate description
    const descValidation = this.jsonValidator.validateDescription(this.description);
    this.descriptionErrors = descValidation.errors;
    if (!descValidation.isValid) isValid = false;
    
    // Validate file selection
    if (!this.file) {
      this.fileErrors = ['Please select a file'];
      isValid = false;
    }
    
    // Validate JSON content
    if (this.fileContent && !this.jsonValidator.validateJsonContent(this.fileContent)) {
      this.fileErrors = ['Invalid JSON format'];
      isValid = false;
    }
    
    return isValid;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    this.isSubmitting = true;
    const fileItem: FileItem = {
      id: Date.now().toString(),
      filename: this.file!.name,
      name: this.name,
      description: this.description,
      content: this.fileContent,
      isValid: this.jsonValidator.validateJsonContent(this.fileContent),
      uploadDate: new Date()
    };
    this.store.dispatch(addFile({ file: fileItem }));
    setTimeout(() => {
      this.isSubmitting = false;
      this.close.emit();
    }, 500);
  }

  onCancel() {
    this.close.emit();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else {
      this.file = null;
    }
  }

  onUpload() {
    if (this.file && this.name) {
      const reader = new FileReader();
      reader.onload = () => {
        let isValid = true;
        let content = '';
        try {
          content = reader.result as string;
          JSON.parse(content);
        } catch {
          isValid = false;
        }
        const fileItem: FileItem = {
          id: crypto.randomUUID(),
          filename: this.file!.name,
          name: this.name,
          description: this.description,
          content,
          isValid,
          uploadDate: new Date()
        };
        this.store.dispatch(addFile({ file: fileItem }));
        this.close.emit();
      };
      reader.readAsText(this.file);
    }
  }
}
