import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { uploadImage } from 'clients/crustnft-explore-api/medias';
import useAuth from 'hooks/useAuth';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageType } from '../../../@types/imagesGCS';
import Iconify from '../../../components/Iconify';
import uuidv4 from '../../../utils/uuidv4';

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: '200px',
  height: '200px',
  fontSize: 24,
  marginBottom: 20,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `dashed 3px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 }
}));

type UploadFileProps = {
  onAddImage: (task: ImageType) => void;
  onCloseAddImage: VoidFunction;
};

export default function ImagesAdd({ onAddImage, onCloseAddImage }: UploadFileProps) {
  const { accessToken } = useAuth();
  const handleAddImage = async (file: File) => {
    try {
      const imageId = uuidv4();
      await uploadImage(accessToken, imageId, file);
      onAddImage({
        name: file.name.split('.').slice(0, -1).join('.'),
        id: imageId
      });
    } catch (e) {
      console.log('Error uploading image to GCS', e);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        handleAddImage(file);
        // onAddImage({
        //   name: file.name.split('.').slice(0, -1).join('.'),
        //   id: uuidv4()
        // });
      });
    },
    [onAddImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*'
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
