import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Card, Dialog, DialogContent, Stack, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormProvider } from '../../../components/hook-form';
import { CPProjectsContext } from '../CPProjectsDashboard';
import TextField from './TextField';

type FormValues = {
  name: string;
  description: string;
};

const defaultValues = {
  name: '',
  description: ''
};

export default function ProjectCardEmpty() {
  const theme = useTheme();
  const { CPProjects, setCPProjects } = useContext(CPProjectsContext);

  const [openDialogLevels, setOpenDialogLevels] = useState(false);

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string()
  });

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewProjectSchema),
    defaultValues
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async () => {
    const { name, description } = watch();
    setCPProjects([
      ...CPProjects,
      { name, description: description || '', createdAt: new Date().getTime() }
    ]);
  };
  return (
    <>
      <Card
        sx={{
          backgroundColor: 'background.paper',
          px: 2,
          py: 1,
          height: '151.13px',
          border: '3px dashed',
          borderColor: 'text.secondary',
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
                <TextField name="name" label="Name" required={true} autoComplete="off" />
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  minRows={4}
                  autoComplete="off"
                />
              </Stack>
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
            </FormProvider>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
