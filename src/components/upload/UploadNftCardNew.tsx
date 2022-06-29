import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import { Theme } from 'theme';
import BlockContent from './BlockContent';
import MultiFilePreview from './MultiFilePreview';
import RejectionFiles from './RejectionFiles';
import { UploadMultiFileProps } from './type';

const DropZoneStyle = styled('div')(({ theme }: { theme: Theme }) => ({
  outline: 'none',
  padding: theme.spacing(2, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.secondary,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

export default function UploadNftCard({
  error,
  file,
  onRemove,
  helperText,
  sx,
  ...other
}: UploadMultiFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Typography variant="h5" color="text.primary" sx={{ mb: '25px' }}>
        Upload file
      </Typography>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          })
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <MultiFilePreview file={file} onRemove={onRemove} />

      {helperText && helperText}
    </Box>
  );
}
