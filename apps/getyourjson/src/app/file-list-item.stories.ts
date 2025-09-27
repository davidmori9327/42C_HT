// Storybook configuration - requires @storybook/angular to be installed
// import { Meta, StoryObj } from '@storybook/angular';
import { FileListItemComponent } from './file-list-item';
import { FileItem } from './store/file.model';

// Uncomment the following when Storybook is installed:
/*
const meta: Meta<FileListItemComponent> = {
  title: 'Components/FileListItem',
  component: FileListItemComponent,
  tags: ['autodocs'],
  argTypes: {
    file: {
      control: 'object',
      description: 'The file item to display'
    }
  }
};

export default meta;

type Story = StoryObj<FileListItemComponent>;

export const Default: Story = {
  args: {
    file: {
      id: '1',
      filename: 'example.json',
      name: '42c-davidmori-demo',
      description: 'A sample JSON file for demonstration',
      content: '{"name": "test", "value": 123}',
      isValid: true,
      uploadDate: new Date('2024-01-15T10:30:00Z')
    }
  }
};

export const InvalidJson: Story = {
  args: {
    file: {
      id: '2',
      filename: 'invalid.json',
      name: '42c-davidmori-invalid',
      description: 'A file with invalid JSON content',
      content: '{"name": "test", "value": 123', // Missing closing brace
      isValid: false,
      uploadDate: new Date('2024-01-15T11:00:00Z')
    }
  }
};

export const LongDescription: Story = {
  args: {
    file: {
      id: '3',
      filename: 'long-desc.json',
      name: '42c-davidmori-long',
      description: 'This is a very long description that might wrap to multiple lines in the table cell to test the layout and styling',
      content: '{"description": "This is a test file with a long description"}',
      isValid: true,
      uploadDate: new Date('2024-01-15T12:00:00Z')
    }
  }
};

export const RecentUpload: Story = {
  args: {
    file: {
      id: '4',
      filename: 'recent.json',
      name: '42c-davidmori-recent',
      description: 'Recently uploaded file',
      content: '{"timestamp": "2024-01-15T15:30:00Z"}',
      isValid: true,
      uploadDate: new Date() // Current date
    }
  }
};
*/