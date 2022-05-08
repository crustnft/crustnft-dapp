import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import ThemeProvider from 'theme';
import FormProvider from './FormProvider';
import { RHFUploadNftCard } from './RHFUpload';
const RHFUploadNftCardStories = {
  title: 'RHFUploadNftCard',
  component: RHFUploadNftCard
};
export default RHFUploadNftCardStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <ThemeProvider theme="crust">
      <FormProvider methods={formContext}>
        <Stack direction="row" spacing={2}>
          <div style={{ width: 300 }}>
            <RHFUploadNftCard name="card" />
          </div>
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
};
