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

const statPlaceholderRow = { statType: '', value: 0, max: 0, isPlaceholder: true };

export default function StatsField({ form }: { form: UseFormReturn<CollectionFormType> }) {
  const statsField = useFieldArray({
    control: form.control,
    name: 'stats'
  });
  const addEditStatsForm = useForm<CollectionComplexInputFormType<'stats'>>({
    defaultValues: { stats: [statPlaceholderRow] },
    mode: 'onBlur'
  });
  const addEditStatsField = useFieldArray({
    control: addEditStatsForm.control,
    name: 'stats'
  });
  const { isValid: isStatsValid } = addEditStatsForm.formState;

  const addEditStatsModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    return {
      actions: (
        <CrustButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if (!isStatsValid) {
              return;
            }
            statsField.replace(addEditStatsForm.getValues('stats'));
          }}
        >
          Save
        </CrustButton>
      ),
      title: 'Add stats',
      children: (
        <>
          <Typography variant="subtitle1">
            Stats show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>

          <FormProvider methods={addEditStatsForm}>
            <Stack spacing={2.5} direction="column">
              {addEditStatsField.fields.map((stat, i) => (
                <Stack spacing={2.5} direction="row" key={stat.id}>
                  <CrustInput
                    name={`stats.${i}.statType`}
                    value={stat.statType}
                    sx={{ mb: 0 }}
                    rules={{
                      required: true
                      // validate: (statType) =>
                      //   !addEditStatsField.fields.find((field) => statType === field.statType)
                    }}
                  />
                  <CrustInput
                    name={`stats.${i}.value`}
                    type="number"
                    value={stat.value}
                    sx={{ mb: 0 }}
                  />
                  <Typography sx={{ pt: 0.8, display: 'flex', alignItems: 'center' }}>
                    of
                  </Typography>
                  <CrustInput
                    name={`stats.${i}.max`}
                    type="number"
                    value={stat.max}
                    sx={{ mb: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {(addEditStatsField.fields.length === 1 && i === 0) ||
                    (isStatsValid && i === addEditStatsField.fields.length - 1) ? (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditStatsField.append(statPlaceholderRow);
                        }}
                        disabled={!isStatsValid}
                      >
                        <IconPlusSquare />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditStatsField.remove(i);
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
  }, [addEditStatsForm, addEditStatsField, statsField, isStatsValid]);
  return (
    <CrustComplexInput
      {...complexInputCtaStyleProps}
      name="stats"
      helpText="Stats of the collection"
      label="Stats"
      addModalProps={addEditStatsModalProps}
      editModalProps={addEditStatsModalProps}
      render={({ field, isArray }) => {
        return isArray
          ? field.value.map((val: string) => <CrustOptionBox key={val}>{val}</CrustOptionBox>)
          : null;
      }}
      addText="Add Stats"
      editText="Edit Stats"
    />
  );
}
