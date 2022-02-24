import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { create } from 'ipfs-http-client';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserManager } from '../../../@types/user';
import { FormProvider, RHFUploadNftCard } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import { fData } from '../../../utils/formatNumber';
import type { BoostProps, LevelProps, PropertyProps, StatProps } from '../MintNft.types';
import Property from './/Property';
import CircularBoost from './CircularBoost';
import LevelProgress from './LevelProgress';
import NewBoostsDialog from './NewBoostsDialog';
import NewLevelsDialog from './NewLevelsDialog';
import NewPropertiesDialog from './NewPropertiesDialog';
import NewStatsDialog from './NewStatsDialog';
import NftTextField from './NftTextField';
import StatNumber from './StatNumber';
const ipfsGateway = 'https://gw.crustapps.net';

type FormValuesProps = UserManager;

type FormValues = {
  name: string;
  description: string;
  externalLink: string;
  avatarUrl: File | null;
};

export default function NftForm() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [openDialogProperties, setOpenDialogProperties] = useState(false);

  const [levels, setLevels] = useState<LevelProps[]>([]);
  const [openDialogLevels, setOpenDialogLevels] = useState(false);

  const [stats, setStats] = useState<StatProps[]>([]);
  const [openDialogStats, setOpenDialogStats] = useState(false);

  const [boosts, setBoosts] = useState<BoostProps[]>([]);
  const [openDialogBoosts, setOpenDialogBoosts] = useState(false);

  const NewNftSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    externalLink: Yup.string().url('Invalid URL'),
    avatarUrl: Yup.mixed().test('required', 'Image is required', (value) => value !== null)
  });

  const defaultValues = {
    name: '',
    description: '',
    externalLink: '',
    avatarUrl: null
  };

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewNftSchema),
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

  const authHeader =
    'cG9sLTB4QTIyOGNGYWI4MEE2NzM4NTIyNDc2RGVDMTFkNzkzZDYxMjk5NjhiMjoweGU2ZDA1NDIzYTcxY2YzNjdjNWNhZmQwNzRmOWZjODAyMWUwMmEzZDA4MGViZTMyY2VhNDA0MjkwZTgxOWM5YTExMDUxMjNhZDJjZWM2ZjQ1Y2NiZWRmOTYyYjc5NzA4YWRiYjMwNTcxMGEzZWIzYjMzOWM3MzFmNTc1NGM4NWY1MWM=';

  function pinFileToW3Gateway(): Promise<any> {
    console.log('go in');
    return new Promise((resolve, reject) => {
      if (values.avatarUrl) {
        const ipfs = create({
          url: ipfsGateway + '/api/v0',
          headers: {
            authorization: 'Basic ' + authHeader
          }
        });
        console.log('start pin w3');
        const reader = new FileReader();
        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = async () => {
          const added = await ipfs.add(reader.result as ArrayBuffer);
          console.log(added.cid.toV0().toString());
          resolve({
            cid: added.cid.toV0().toString(),
            name: values?.avatarUrl?.name || '',
            size: added.size
          });
        };

        reader.readAsArrayBuffer(values.avatarUrl);
      } else {
        reject('no file');
      }
    });
  }

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log('success');
      await pinFileToW3Gateway();
      console.log('pinfile');
      reset();
      enqueueSnackbar('Create success!');
      navigate('#/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
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

  const printFile = () => {
    console.log(typeof file);
    console.log(typeof values.avatarUrl);
    console.log(values.avatarUrl);
    //uploadImageHandle();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 2 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadNftCard
                name="avatarUrl"
                accept="image/*"
                maxSize={31457280}
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
                    <br /> max size of {fData(31457280)}
                  </Typography>
                }
              />
            </Box>
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
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="bxs:tag" rotate={2} />
                      <Typography variant="subtitle1">Properties</Typography>
                    </Stack>
                    <Typography variant="caption">
                      Textual traits that show up as rectangles
                    </Typography>
                  </Stack>

                  <Button
                    sx={{ borderColor: '#15B2E5' }}
                    onClick={() => {
                      setOpenDialogProperties(true);
                    }}
                    variant="outlined"
                  >
                    Add Properties
                  </Button>
                </Stack>

                <Box sx={{ height: '8px' }} />
                <Grid container spacing={2}>
                  {properties.map((property, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3}>
                      <Property {...property} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              <NewPropertiesDialog
                openDialogProperties={openDialogProperties}
                properties={properties}
                setProperties={setProperties}
                setOpenDialogProperties={setOpenDialogProperties}
              />

              <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="bxs:star" />
                      <Typography variant="subtitle1">Levels</Typography>
                    </Stack>
                    <Typography variant="caption">
                      Numerical traits that show as a progress bar
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#15B2E5' }}
                    onClick={() => {
                      setOpenDialogLevels(true);
                    }}
                  >
                    Add Levels
                  </Button>
                </Stack>
                <Box sx={{ height: '8px' }} />
                <Stack spacing={1}>
                  {levels.map((level, index) => (
                    <LevelProgress key={level.levelType + index} {...level} />
                  ))}
                </Stack>
              </Stack>

              <NewLevelsDialog
                openDialogLevels={openDialogLevels}
                setOpenDialogLevels={setOpenDialogLevels}
                levels={levels}
                setLevels={setLevels}
              />

              <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="ion:stats-chart" />
                      <Typography variant="subtitle1">Stats</Typography>
                    </Stack>
                    <Typography variant="caption">
                      Numerical traits that just show as numbers
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#15B2E5' }}
                    onClick={() => {
                      setOpenDialogStats(true);
                    }}
                  >
                    Add Stats
                  </Button>
                </Stack>

                <Box sx={{ height: '8px' }} />
                <Grid container spacing={1}>
                  {stats.map((stat, index) => (
                    <Grid key={stat.statType + index} item xs={6}>
                      <StatNumber {...stat} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              <NewStatsDialog
                openDialogStats={openDialogStats}
                setOpenDialogStats={setOpenDialogStats}
                stats={stats}
                setStats={setStats}
              />

              <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="ic:baseline-flash-on" />
                      <Typography variant="subtitle1">Boosts</Typography>
                    </Stack>
                    <Typography variant="caption">
                      Number or percentage boosts that show up as a circular boost
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#15B2E5' }}
                    onClick={() => {
                      setOpenDialogBoosts(true);
                    }}
                  >
                    Add Boosts
                  </Button>
                </Stack>

                <Box sx={{ height: '8px' }} />
                <Stack direction="row" spacing={1}>
                  {boosts.map((boost, index) => (
                    <CircularBoost key={boost.boostType + index} {...boost} />
                  ))}
                </Stack>
              </Stack>
              <NewBoostsDialog
                openDialogBoosts={openDialogBoosts}
                setOpenDialogBoosts={setOpenDialogBoosts}
                boosts={boosts}
                setBoosts={setBoosts}
              />
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
