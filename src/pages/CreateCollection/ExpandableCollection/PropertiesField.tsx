import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CrustButton from 'components/crust/CrustButton';
import CrustComplexInput, { CrustComplexInputProps } from 'components/crust/CrustComplexInput';
import CrustInput from 'components/crust/CrustInput';
import CrustOptionBox from 'components/crust/CrustOptionBox';
import { IconPlusSquare, IconTrash } from 'components/crust/icons';
import { FormProvider } from 'components/hook-form';
import { useMemo } from 'react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { pxToRem } from 'utils/getFontValue';
import { complexInputCtaStyleProps } from './styles';
import { CollectionComplexInputFormType, CollectionFormType } from './types';

const propertyPlaceholderRow = { name: '', value: '', isPlaceholder: true };

export default function PropertiesField({ form }: { form: UseFormReturn<CollectionFormType> }) {
  const propertiesField = useFieldArray({
    control: form.control,
    name: 'properties'
  });
  const addEditPropertiesForm = useForm<CollectionComplexInputFormType<'properties'>>({
    defaultValues: { properties: [propertyPlaceholderRow] },
    mode: 'onBlur'
  });
  const addEditPropertiesField = useFieldArray({
    control: addEditPropertiesForm.control,
    name: 'properties'
  });
  const { isValid: isPropertiesValid } = addEditPropertiesForm.formState;
  const addEditPropertiesModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    return {
      actions: (
        <CrustButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if (!isPropertiesValid) {
              return;
            }
            console.log(addEditPropertiesForm.getValues('properties'));
            propertiesField.replace(addEditPropertiesForm.getValues('properties'));
            console.log(propertiesField.fields);
          }}
        >
          Save
        </CrustButton>
      ),
      title: 'Add properties',
      children: (
        <>
          <Typography variant="subtitle1">Your subtitle is here. Feel free to change it</Typography>
          <FormProvider methods={addEditPropertiesForm}>
            <Stack spacing={2.5} direction="column">
              {addEditPropertiesField.fields.map((property, i) => (
                <Stack spacing={2.5} direction="row" key={property.id}>
                  <CrustInput
                    name={`properties.${i}.name`}
                    sx={{ mb: 0 }}
                    placeholder={`e.g "Gender"`}
                    rules={{
                      required: true
                      // validate: (name) =>
                      //   !addEditPropertiesField.fields.find((field) => name === field.name)
                    }}
                  />
                  <CrustInput
                    name={`properties.${i}.value`}
                    sx={{ mb: 0 }}
                    placeholder={`e.g "Male"`}
                    rules={{ required: true }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {(addEditPropertiesField.fields.length === 1 && i === 0) ||
                    (isPropertiesValid && i === addEditPropertiesField.fields.length - 1) ? (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditPropertiesField.append(propertyPlaceholderRow);
                        }}
                        disabled={!isPropertiesValid}
                      >
                        <IconPlusSquare />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditPropertiesField.remove(i);
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
  }, [addEditPropertiesField, addEditPropertiesForm, propertiesField, isPropertiesValid]);
  return (
    <CrustComplexInput
      {...complexInputCtaStyleProps}
      name="properties"
      helpText="Properties of the collection"
      label="Properties"
      addModalProps={addEditPropertiesModalProps}
      editModalProps={addEditPropertiesModalProps}
      render={({ field }) => {
        return (
          <Stack spacing={2.5} direction="row">
            {propertiesField.fields.map((property) => (
              <CrustOptionBox key={property.id}>
                {property.name}: {property.value}
              </CrustOptionBox>
            ))}
          </Stack>
        );
      }}
      addText="Add Properties"
      editText="Edit Properties"
    />
  );
}
