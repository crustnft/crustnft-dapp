import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import CrustInput from '../CrustInput';
import CrustFieldset from './CrustFieldset';
const CrustFieldsetStories = {
  title: 'CrustFieldset',
  component: CrustFieldset
};
export default CrustFieldsetStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <CrustFieldset label="A fieldset label">
          <CrustInput label="A text field" name="text" />
          <CrustInput label="Another text field" name="text" />
        </CrustFieldset>
      </Stack>
    </FormProvider>
  );
};
