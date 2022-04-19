import { Theme } from '@mui/material/styles';
// @mui
import { SxProps } from '@mui/system';
import { ReactNode } from 'react';
import { DropzoneOptions } from 'react-dropzone';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files: (File | string)[];
  error?: boolean;
  showPreview?: boolean;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
}
