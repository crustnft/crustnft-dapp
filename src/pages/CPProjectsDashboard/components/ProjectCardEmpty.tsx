import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Card, Dialog, DialogContent, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../components/hook-form';
import TextField from './TextField';

type FormValues = {
  name: string;
  description: string;
  externalLink: string;
};

const defaultValues = {
  name: '',
  description: '',
  externalLink: ''
};

export default function ProjectCardEmpty() {
  const theme = useTheme();
  const [openDialogLevels, setOpenDialogLevels] = useState(false);

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async () => {};
  return (
    <>
      <Card
        sx={{
          backgroundColor: '#F4F6F8',
          px: 2,
          py: 1,
          height: '151.13px',
          border: '4px dashed #C4C4C4',
          borderRadius: '15px'
        }}
        onClick={() => {
          setOpenDialogLevels(true);
        }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Icon icon="akar-icons:plus" width="60" color={theme.palette.text.secondary} />
        </Stack>
      </Card>

      <Dialog
        open={openDialogLevels}
        onClose={() => {
          setOpenDialogLevels(false);
        }}
        scroll="paper"
      >
        <DialogContent dividers={true}>
          <Stack sx={{ p: 1, pb: 2 }} spacing={1}>
            <Typography variant="h5">Add Project</Typography>
            <Typography variant="body2">
              Create a new project and generate your own cryptopunk collection
            </Typography>
          </Stack>

          <Stack sx={{ px: 1 }} spacing={1}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField name="name" label="Name" />
                <TextField name="description" label="Description" multiline minRows={4} />
              </Stack>
            </FormProvider>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="info"
                loading={isSubmitting}
                sx={{
                  backgroundColor: '#1A90FF',
                  display: 'block'
                }}
              >
                Create Project
              </LoadingButton>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
