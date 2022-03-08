// @mui
import { styled } from '@mui/material/styles';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
import { Typography } from '../@c-components';
import Iconify from '../Iconify';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';
// type
import { UploadProps } from './type';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: 300,
  margin: 'auto',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function UploadNftCard({ error, file, helperText, sx, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: 'error.light'
          }),
          ...sx
        }}
      >
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 })
          }}
        >
          <input {...getInputProps()} />

          {file && (
            <Image alt="avatar" src={isString(file) ? file : file.preview} sx={{ zIndex: 8 }} />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 }
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter'
              })
            }}
          >
            <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24, mb: 1 }} />
            <Typography variant="caption">{file ? 'Update photo' : 'Upload photo'}</Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {helperText && helperText}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  );
}
