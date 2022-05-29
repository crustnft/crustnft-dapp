import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CrustButton from 'components/crust/CrustButton';
import CrustComplexInput, { CrustComplexInputProps } from 'components/crust/CrustComplexInput';
import CrustInput from 'components/crust/CrustInput';
import CrustInputDropdown from 'components/crust/CrustInputDropdown';
import { CrustInputDropdownValue } from 'components/crust/CrustInputDropdown/CrustInputDropdown';
import CrustOptionBox from 'components/crust/CrustOptionBox';
import { IconPlusSquare, IconTrash } from 'components/crust/icons';
import { FormProvider } from 'components/hook-form';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { pxToRem } from 'utils/getFontValue';
import { complexInputCtaStyleProps } from './styles';
import {
  CollectionBoostDisplayType,
  CollectionComplexInputFormType,
  CollectionFormType
} from './types';

const boostPlaceholderRow = {
  boostType: '',
  value: 0,
  displayType: 'boost_number' as CollectionBoostDisplayType,
  isPlaceholder: true
};
const boostsTypes: Array<CrustInputDropdownValue<CollectionBoostDisplayType>> = [
  { label: 'number', value: 'boost_number', suffix: '' },
  { label: 'percentage', value: 'boost_percentage', suffix: '%' }
];

export default function BoostsField({ form }: { form: UseFormReturn<CollectionFormType> }) {
  const boostsField = useFieldArray({
    control: form.control,
    name: 'boosts'
  });
  const addEditBoostsForm = useForm<CollectionComplexInputFormType<'boosts'>>({
    defaultValues: { boosts: [boostPlaceholderRow] },
    mode: 'onBlur'
  });
  const addEditBoostsField = useFieldArray({
    control: addEditBoostsForm.control,
    name: 'boosts'
  });
  const { isValid: isBoostsValid } = addEditBoostsForm.formState;
  const [isOpen, setIsOpen] = useState(false);
  const addEditBoostsModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    return {
      actions: (
        <CrustButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if (!isBoostsValid) {
              return;
            }
            boostsField.replace(addEditBoostsForm.getValues('boosts'));
          }}
        >
          Save
        </CrustButton>
      ),
      title: 'Add boosts',
      children: (
        <>
          <Typography variant="subtitle1">
            Boosts show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>

          <FormProvider methods={addEditBoostsForm}>
            <Stack spacing={2.5} direction="column">
              {addEditBoostsField.fields.map((boost, i) => (
                <Stack spacing={2.5} direction="row" key={boost.id}>
                  <CrustInput
                    name={`boosts.${i}.boostType`}
                    value={boost.boostType}
                    sx={{ mb: 0 }}
                    rules={{
                      required: true
                      // validate: (boostType) =>
                      //   !addEditBoostsField.fields.find((field) => boostType === field.boostType)
                    }}
                  />
                  <CrustInputDropdown<CollectionBoostDisplayType>
                    name={`boosts.${i}.value`}
                    type="number"
                    value={boost.value}
                    sx={{ mb: 0 }}
                    dropdownProps={{
                      isOpen,
                      value: boost.displayType,
                      onToggle: () => {
                        setIsOpen(!isOpen);
                      },
                      onChange: (value) => {
                        boostsField.update(i, { displayType: value });
                      },
                      items: boostsTypes
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {(addEditBoostsField.fields.length === 1 && i === 0) ||
                    (isBoostsValid && i === addEditBoostsField.fields.length - 1) ? (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditBoostsField.append(boostPlaceholderRow);
                        }}
                        disabled={!isBoostsValid}
                      >
                        <IconPlusSquare />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditBoostsField.remove(i);
                        }}
                      >
                        <IconTrash />
                      </IconButton>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </FormProvider>
        </>
      )
    };
  }, [addEditBoostsForm, addEditBoostsField, boostsField, isBoostsValid]);
  return (
    <CrustComplexInput
      {...complexInputCtaStyleProps}
      name="boosts"
      helpText="Boosts of the collection"
      label="Boosts"
      addModalProps={addEditBoostsModalProps}
      editModalProps={addEditBoostsModalProps}
      render={({ field, isArray }) => {
        return isArray
          ? field.value.map((val: string) => <CrustOptionBox key={val}>{val}</CrustOptionBox>)
          : null;
      }}
      addText="Add Boosts"
      editText="Edit Boosts"
    />
  );
}
