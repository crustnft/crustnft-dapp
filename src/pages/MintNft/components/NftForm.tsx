import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { FormProvider, RHFSwitch, RHFUploadNftCard } from 'components/hook-form';
import Iconify from 'components/Iconify';
import { create } from 'ipfs-http-client';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserManager } from '../../../@types/user';
import { fData } from '../../../utils/formatNumber';
import CircularBoost from './CircularBoost';
import LevelProgress from './LevelProgress';
import NftTextField from './NftTextField';
import StatNumber from './StatNumber';
const ipfsGateway = 'https://gw.crustapps.net';

type FormValuesProps = UserManager;

type Props = {
  isEdit: boolean;
  currentUser?: UserManager;
};

export default function NftForm({ isEdit }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    externalLink: Yup.string().url('Invalid URL'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== '')
  });

  const defaultValues = {
    name: '',
    description: '',
    externalLink: '',
    avatarUrl: ''
  };

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate('#/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );

  const authHeader =
    'cG9sLTB4QTIyOGNGYWI4MEE2NzM4NTIyNDc2RGVDMTFkNzkzZDYxMjk5NjhiMjoweGU2ZDA1NDIzYTcxY2YzNjdjNWNhZmQwNzRmOWZjODAyMWUwMmEzZDA4MGViZTMyY2VhNDA0MjkwZTgxOWM5YTExMDUxMjNhZDJjZWM2ZjQ1Y2NiZWRmOTYyYjc5NzA4YWRiYjMwNTcxMGEzZWIzYjMzOWM3MzFmNTc1NGM4NWY1MWM=';

  const uploadImageHandle = async () => {
    const ipfs = create({
      url: ipfsGateway + '/api/v0',
      headers: {
        authorization: 'Basic ' + authHeader
      }
    });

    const added = await ipfs.add(values.avatarUrl);

    console.log(added);
    console.log(added.cid.toV0().toString());
  };

  const printFile = () => {
    console.log(values.avatarUrl);
    uploadImageHandle();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 2 }}>
            <Box sx={{ mb: 5 }}>
              <Button onClick={printFile}>Helllo</Button>
              <RHFUploadNftCard
                name="avatarUrl"
                accept="image/*"
                maxSize={30145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(30145728)}
                  </Typography>
                }
              />
            </Box>

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <NftTextField
                name="name"
                label="Name"
                size="small"
                required={true}
                placeholder="Item name"
              />
              <NftTextField
                name="externalLink"
                label="External Link"
                description="We will include a link on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
                size="small"
                placeholder="https://your-gallery.com/item-name"
              />
              <NftTextField
                name="description"
                label="Description"
                description="The description will be included on the item's detail page underneath its image."
                size="small"
                multiline
                minRows={4}
                placeholder="Provide a detailed description of your item."
              />
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="bxs:tag" rotate={2} />
                  <Typography variant="subtitle1">Properties</Typography>
                </Stack>

                <Typography variant="caption">Textual traits that show up as rectangles</Typography>
                <Box sx={{ height: '8px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Card
                      sx={{ p: 2, backgroundColor: '#F4F6F8', borderColor: '#15B2E5' }}
                      variant="outlined"
                    >
                      <Stack alignItems="center" spacing={1}>
                        <Typography variant="overline">Character</Typography>
                        <Typography variant="body2">Character</Typography>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card
                      sx={{ p: 2, backgroundColor: '#F4F6F8', borderColor: '#15B2E5' }}
                      variant="outlined"
                    >
                      <Stack alignItems="center" spacing={1}>
                        <Typography variant="overline">Character</Typography>
                        <Typography variant="body2">Character</Typography>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card
                      sx={{ p: 2, backgroundColor: '#F4F6F8', borderColor: '#15B2E5' }}
                      variant="outlined"
                    >
                      <Stack alignItems="center" spacing={1}>
                        <Typography variant="overline">Character</Typography>
                        <Typography variant="body2">Character</Typography>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>

              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="carbon:location-star-filled" />
                  <Typography variant="subtitle1">Levels</Typography>
                </Stack>

                <Typography variant="caption">
                  Numerical traits that show as a progress bar
                </Typography>
                <Box sx={{ height: '8px' }} />
                <Stack spacing={1}>
                  <LevelProgress progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <LevelProgress progress={{ label: 'Speed', max: -100, value: 200 }} />
                </Stack>
              </Stack>

              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ion:stats-chart" />
                  <Typography variant="subtitle1">Stats</Typography>
                </Stack>

                <Typography variant="caption">
                  Numerical traits that just show as numbers
                </Typography>
                <Box sx={{ height: '8px' }} />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <StatNumber progress={{ label: 'Generation', max: 2, value: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <StatNumber progress={{ label: 'Group', max: 2, value: 1 }} />
                  </Grid>
                </Grid>
              </Stack>

              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ic:baseline-flash-on" />
                  <Typography variant="subtitle1">Boosts</Typography>
                </Stack>
                <Typography variant="caption">
                  Number or percentage boosts that show up as a circular boost
                </Typography>
                <Box sx={{ height: '8px' }} />
                <Stack direction="row" spacing={1}>
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                  <CircularBoost progress={{ label: 'Speed', max: 180, value: 200 }} />
                </Stack>
              </Stack>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ backgroundColor: '#1A90FF' }}
              >
                Mint NFT
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
