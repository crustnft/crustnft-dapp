import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import CrustOptionBox from '../CrustOptionBox';
import CrustComplexInput from './CrustComplexInput';
const CrustComplexInputStories = {
  title: 'CrustComplexInput',
  component: CrustComplexInput
};
export default CrustComplexInputStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2} sx={{ width: 600, margin: 'auto' }}>
        <CrustComplexInput
          name="text"
          label="Properties"
          helpText="This is a properties list"
          addText="Add properties"
          editText="Edit properties"
          render={({ field, isArray }) => {
            return isArray
              ? field.value.map((val: string) => <CrustOptionBox key={val}>{val}</CrustOptionBox>)
              : null;
          }}
        />
      </Stack>
    </FormProvider>
  );
};
