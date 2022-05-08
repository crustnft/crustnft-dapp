import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import ThemeProvider from 'theme';
import FormProvider from './FormProvider';
import { RHFUploadMultiFile } from './RHFUpload';
const RHFUploadMultiFileStories = {
  title: 'RHFUploadMultiFile',
  component: RHFUploadMultiFile
};
export default RHFUploadMultiFileStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <ThemeProvider theme="crust">
      <FormProvider methods={formContext}>
        <Stack direction="row" spacing={2}>
          <RHFUploadMultiFile name="multifile" />
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
};
