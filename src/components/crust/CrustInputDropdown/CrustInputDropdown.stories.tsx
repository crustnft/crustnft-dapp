import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CrustInputDropdown from './CrustInputDropdown';
const CrustInputDropdownStories = {
  title: 'CrustInputDropdown',
  component: CrustInputDropdown
};
export default CrustInputDropdownStories;

export const Default = () => {
  const formContext = useForm();
  const [dropdownValue, setDropdownValue] = useState('boost_number');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <CrustInputDropdown
          name="boots"
          dropdownProps={{
            isOpen,
            value: dropdownValue,
            onToggle: () => {
              setIsOpen(!isOpen);
            },
            onChange: (value) => {
              setDropdownValue(value);
            },
            items: [
              { label: 'number', value: 'boost_number' },
              { label: 'percentage', value: 'boost_percentage' }
            ]
          }}
        />
      </Stack>
    </FormProvider>
  );
};
