import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonValidatorService {

  validateJsonContent(content: string): boolean {
    try {
      JSON.parse(content);
      return true;
    } catch (error) {
      return false;
    }
  }

  validateFileName(name: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check length
    if (name.length < 1 || name.length > 32) {
      errors.push('Name must be between 1 and 32 characters');
    }
    
    // Check allowed characters (English alphabet, numbers, underscores, dashes)
    const allowedPattern = /^[a-zA-Z0-9_-]+$/;
    if (!allowedPattern.test(name)) {
      errors.push('Name can only contain English letters, numbers, underscores, and dashes');
    }
    
    // Check for required substring (42c-[your-github-username])
    // For demo purposes, using a placeholder username
    const requiredSubstring = '42c-davidmori9327';
    if (!name.includes(requiredSubstring)) {
      errors.push(`Name must contain '${requiredSubstring}'`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateDescription(description: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check length
    if (description.length > 128) {
      errors.push('Description must not exceed 128 characters');
    }
    
    // Check that it doesn't contain the forbidden substring
    const forbiddenSubstring = '42c-davidmori9327';
    if (description.includes(forbiddenSubstring)) {
      errors.push(`Description must not contain '${forbiddenSubstring}'`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateFileExtension(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.json');
  }
}

