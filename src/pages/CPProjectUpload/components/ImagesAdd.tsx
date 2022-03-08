import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageCard as ImageCardProps } from '../../../@types/imagesGCS';
import { Stack, Typography } from '../../../components/@c-components';
import Iconify from '../../../components/Iconify';
import uuidv4 from '../../../utils/uuidv4';

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: '100%',
  fontSize: 24,
  marginBottom: 20,
  backgroundColor: '#fafafa',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 }
}));

type UploadFileProps = {
  onAddImage: (task: ImageCardProps) => void;
  onCloseAddImage: VoidFunction;
};

export default function ImagesAdd({ onAddImage, onCloseAddImage }: UploadFileProps) {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        onAddImage({
          imageUrl: URL.createObjectURL(file),
          name: file.name.split('.').slice(0, -1).join('.'),
          id: uuidv4()
        });
      });
    },
    [onAddImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
    <>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 })
        }}
      >
        <input {...getInputProps()} />

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          alignItems="center"
          width="100%"
          sx={{ padding: 2 }}
        >
          <Iconify icon={'eva:plus-fill'} sx={{ color: 'text.secondary' }} />

          <Stack direction="column">
            <Typography variant="body2">Click to add or drag images</Typography>
            <Typography variant="caption">Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          </Stack>
        </Stack>
      </DropZoneStyle>
    </>
  );
}
