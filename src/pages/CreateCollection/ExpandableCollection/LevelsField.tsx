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

const levelPlaceholderRow = { levelType: '', value: 0, max: 0, isPlaceholder: true };

export default function LevelsField({ form }: { form: UseFormReturn<CollectionFormType> }) {
  const levelsField = useFieldArray({
    control: form.control,
    name: 'levels'
  });
  const addEditLevelsForm = useForm<CollectionComplexInputFormType<'levels'>>({
    defaultValues: { levels: [levelPlaceholderRow] },
    mode: 'onBlur'
  });
  const addEditLevelsField = useFieldArray({
    control: addEditLevelsForm.control,
    name: 'levels'
  });
  const { isValid: isLevelsValid } = addEditLevelsForm.formState;

  const addEditLevelsModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    return {
      actions: (
        <CrustButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if (!isLevelsValid) {
              return;
            }
            levelsField.replace(addEditLevelsForm.getValues('levels'));
          }}
        >
          Save
        </CrustButton>
      ),
      title: 'Add levels',
      children: (
        <>
          <Typography variant="subtitle1">
            Levels show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>

          <FormProvider methods={addEditLevelsForm}>
            <Stack spacing={2.5} direction="column">
              {addEditLevelsField.fields.map((level, i) => (
                <Stack spacing={2.5} direction="row" key={level.id}>
                  <CrustInput
                    name={`levels.${i}.levelType`}
                    value={level.levelType}
                    sx={{ mb: 0 }}
                    rules={{
                      required: true
                      // validate: (levelType) =>
                      //   !addEditLevelsField.fields.find((field) => levelType === field.levelType)
                    }}
                  />
                  <CrustInput
                    name={`levels.${i}.value`}
                    type="number"
                    value={level.value}
                    sx={{ mb: 0 }}
                  />
                  <Typography sx={{ pt: 0.8, display: 'flex', alignItems: 'center' }}>
                    of
                  </Typography>
                  <CrustInput
                    name={`levels.${i}.max`}
                    type="number"
                    value={level.max}
                    sx={{ mb: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {(addEditLevelsField.fields.length === 1 && i === 0) ||
                    (isLevelsValid && i === addEditLevelsField.fields.length - 1) ? (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditLevelsField.append(levelPlaceholderRow);
                        }}
                        disabled={!isLevelsValid}
                      >
                        <IconPlusSquare />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditLevelsField.remove(i);
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
  }, [addEditLevelsForm, addEditLevelsField, levelsField, isLevelsValid]);
  return (
    <CrustComplexInput
      {...complexInputCtaStyleProps}
      name="levels"
      helpText="Levels of the collection"
      label="Levels"
      addModalProps={addEditLevelsModalProps}
      editModalProps={addEditLevelsModalProps}
      render={({ field, isArray }) => {
        return isArray
          ? field.value.map((val: string) => <CrustOptionBox key={val}>{val}</CrustOptionBox>)
          : null;
      }}
      addText="Add Levels"
      editText="Edit Levels"
    />
  );
}
