import { Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import { CustomFile, UploadProps } from 'components/upload';
import RejectionFiles from 'components/upload/RejectionFiles';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { pxToRem } from 'utils/getFontValue';
import CrustButton from '../CrustButton';
import { IconUpload } from '../icons';
type Props = Omit<UploadProps, 'file'> & {
  name: string;
  file?: CustomFile;
  rule?: string;
};

const RootStyle = styled('div')(({ theme }) => ({
  margin: 'auto'
}));

const DropZoneStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  border: `dashed 2px ${theme.palette.grey[400]}`,
  borderRadius: pxToRem(15),
  display: 'flex',
  flexFlow: 'column',
  height: '100%',
  justifyContent: 'center',
  outline: 'none',
  overflow: 'hidden',
  padding: pxToRem(40),
  position: 'relative',
  width: '100%',
  zIndex: 0,
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
}));

const Rule = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  marginBottom: 13,
  color: theme.palette.grey[600]
}));

const UploadButton = styled(CrustButton)(({ theme }) => {
  return {
    ...theme.typography.buttonM,
    boxShadow: theme.customShadows?.z12,
    backgroundColor: theme.palette.grey[300],
    textTransform: 'none'
  };
});

export default function CrustUpload({ name, file, helperText, sx, rule }: Props) {
  const { control } = useFormContext();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <RootStyle
              sx={{
                ...(isDragReject || error
                  ? {
                      borderColor: 'error.light'
                    }
                  : {}),
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

                {file && <img alt="avatar" src={isString(file) ? file : file.preview} />}

                {rule ? <Rule>{rule}</Rule> : null}
                <UploadButton color="default" variant="contained">
                  <IconUpload style={{ marginRight: 12 }} /> Choose file
                </UploadButton>
              </DropZoneStyle>
            </RootStyle>

            {helperText && helperText}

            {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}
