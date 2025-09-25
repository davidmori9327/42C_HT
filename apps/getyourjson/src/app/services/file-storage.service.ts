import { Injectable } from '@angular/core';
import { FileItem } from '../store/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private readonly STORAGE_KEY = 'getyourjson-files';

  loadFiles(): FileItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const files = JSON.parse(stored);
        return files.map((file: any) => ({
          ...file,
          uploadDate: new Date(file.uploadDate)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading files from localStorage:', error);
      return [];
    }
  }

  saveFiles(files: FileItem[]): void {
    try {
      const currentFiles = this.loadFiles();
      const updatedFiles = [...currentFiles, ...files];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFiles));
    } catch (error) {
      console.error('Error saving files to localStorage:', error);
    }
  }

  removeFile(id: string): void {
    try {
      const files = this.loadFiles();
      const updatedFiles = files.filter(file => file.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFiles));
    } catch (error) {
      console.error('Error removing file from localStorage:', error);
    }
  }

  clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing files from localStorage:', error);
    }
  }
}

