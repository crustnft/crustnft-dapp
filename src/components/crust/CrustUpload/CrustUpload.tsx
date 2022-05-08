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
type Props = Omit<UploadProps, 'file'> & {
  name: string;
  file?: CustomFile;
  rule?: string;
};

const RootStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

const DropZoneStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  flexFlow: 'column',
  overflow: 'hidden',
  borderRadius: pxToRem(15),
  padding: pxToRem(40),
  position: 'relative',
  alignItems: 'center',
  border: `dashed 2px ${theme.palette.grey[400]}`,
  justifyContent: 'center',
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

const DownloadButton = styled(CrustButton)(({ theme }) => {
  console.log(theme);
  return {
    boxShadow: theme.customShadows?.z12
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

                {file && <img alt="avatar" src={isString(file) ? file : file.preview} />}

                {rule ? <Rule>{rule}</Rule> : null}
                <DownloadButton color="default" variant="contained">
                  Choose file
                </DownloadButton>
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
