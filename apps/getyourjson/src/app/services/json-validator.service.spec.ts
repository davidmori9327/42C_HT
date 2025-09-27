import { TestBed } from '@angular/core/testing';
import { JsonValidatorService } from './json-validator.service';

describe('JsonValidatorService', () => {
  let service: JsonValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateJsonContent', () => {
    it('should return true for valid JSON', () => {
      const validJson = '{"name": "test", "value": 123}';
      expect(service.validateJsonContent(validJson)).toBe(true);
    });

    it('should return false for invalid JSON', () => {
      const invalidJson = '{"name": "test", "value": 123'; // Missing closing brace
      expect(service.validateJsonContent(invalidJson)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.validateJsonContent('')).toBe(false);
    });

    it('should return false for non-JSON string', () => {
      expect(service.validateJsonContent('Hello World')).toBe(false);
    });

    it('should return true for JSON array', () => {
      const jsonArray = '[{"id": 1}, {"id": 2}]';
      expect(service.validateJsonContent(jsonArray)).toBe(true);
    });

    it('should return true for JSON with nested objects', () => {
      const nestedJson = '{"user": {"name": "John", "age": 30}, "active": true}';
      expect(service.validateJsonContent(nestedJson)).toBe(true);
    });
  });

  describe('validateFileName', () => {
    it('should return valid for correct name with required substring', () => {
      const result = service.validateFileName('42c-davidmori-test');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return invalid for name without required substring', () => {
      const result = service.validateFileName('test-name');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Name must contain '42c-davidmori'");
    });

    it('should return invalid for name too long', () => {
      const longName = '42c-davidmori-' + 'a'.repeat(20); // 33 characters total
      const result = service.validateFileName(longName);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be between 1 and 32 characters');
    });

    it('should return invalid for name with invalid characters', () => {
      const result = service.validateFileName('42c-davidmori-test@');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name can only contain English letters, numbers, underscores, and dashes');
    });

    it('should return invalid for empty name', () => {
      const result = service.validateFileName('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be between 1 and 32 characters');
    });
  });

  describe('validateDescription', () => {
    it('should return valid for description without forbidden substring', () => {
      const result = service.validateDescription('This is a valid description');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return invalid for description with forbidden substring', () => {
      const result = service.validateDescription('This contains 42c-davidmori which is forbidden');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Description must not contain '42c-davidmori'");
    });

    it('should return invalid for description too long', () => {
      const longDescription = 'a'.repeat(129); // 129 characters
      const result = service.validateDescription(longDescription);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must not exceed 128 characters');
    });

    it('should return valid for empty description', () => {
      const result = service.validateDescription('');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('validateFileExtension', () => {
    it('should return true for .json extension', () => {
      expect(service.validateFileExtension('test.json')).toBe(true);
      expect(service.validateFileExtension('TEST.JSON')).toBe(true);
      expect(service.validateFileExtension('file.json')).toBe(true);
    });

    it('should return false for non-JSON extension', () => {
      expect(service.validateFileExtension('test.txt')).toBe(false);
      expect(service.validateFileExtension('test.js')).toBe(false);
      expect(service.validateFileExtension('test')).toBe(false);
    });
  });
});
