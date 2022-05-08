import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import ThemeProvider from 'theme';
import FormProvider from './FormProvider';
import { RHFUploadAvatar } from './RHFUpload';
const RHFUploadStories = {
  title: 'RHFUploadAvatar',
  component: RHFUploadAvatar
};
export default RHFUploadStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <ThemeProvider theme="crust">
      <FormProvider methods={formContext}>
        <Stack direction="row" spacing={2}>
          <RHFUploadAvatar name="avatar" />
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
};
