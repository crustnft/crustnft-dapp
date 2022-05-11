import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import CrustContainedTag from '../CrustContainedTag/CrustContainedTag';
import CrustContainedTagList from './CrustContainedTagList';

const CrustContainedTagListStories = {
  title: 'CrustContainedTagList',
  component: CrustContainedTagList
};
export default CrustContainedTagListStories;
export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <CrustContainedTagList name="tagList" direction="row" onChange={(value) => alert(value)}>
          <CrustContainedTag label="First tag in the list" value="first" />
          <CrustContainedTag label="Second tag in the list" value="second" />
        </CrustContainedTagList>
      </Stack>
    </FormProvider>
  );
};
