import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { create } from 'ipfs-http-client';
import { useSnackbar } from 'notistack';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import { AUTH_HEADER, pinW3Crust } from 'services/w3AuthIpfs';
import * as Yup from 'yup';
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
import NftCreationStatus from './NftCreationStatus';
import NftTextField from './NftTextField';
import StatNumber from './StatNumber';

const ipfsGateway = 'https://gw.crustapps.net';

const initialNftCreationStatus = {
  uploadingImage: false,
  uploadImageSuccess: false,
  uploadImageError: false,
  uploadingMetadata: false,
  uploadMetadataSuccess: false,
  uploadMetadataError: false,
  mintingNft: false,
  mintNftSuccess: false,
  mintNftError: false,
  txHash: '',
  activeStep: 0,
  setActiveStep: () => {},
  imageCid: '',
  metadataCid: ''
};

type NftCreationStatus = {
  uploadingImage: boolean;
  uploadImageSuccess: boolean;
  uploadImageError: boolean;
  uploadingMetadata: boolean;
  uploadMetadataSuccess: boolean;
  uploadMetadataError: boolean;
  mintingNft: boolean;
  mintNftSuccess: boolean;
  mintNftError: boolean;
  txHash: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  imageCid: string;
  metadataCid: string;
};

export const NftCreationStatusContext = createContext<NftCreationStatus>(initialNftCreationStatus);

type FormValues = {
  name: string;
  description: string;
  externalLink: string;
  avatar: File | null;
  properties: PropertyProps[];
  levels: LevelProps[];
  stats: StatProps[];
  boosts: BoostProps[];
};

export default function NftForm() {
  const { chain, contractAddr } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const { chain: selectedChain } = useWallet();
  const [isNetworkCorrect, setIsNetworkCorrect] = useState(true);

  const { account, library } = useWeb3();
  const [mintingState, setMintingState] = useState<'notstarted' | 'success' | 'error'>(
    'notstarted'
  );

  const [openDialogProperties, setOpenDialogProperties] = useState(false);
  const [openDialogLevels, setOpenDialogLevels] = useState(false);
  const [openDialogStats, setOpenDialogStats] = useState(false);
  const [openDialogBoosts, setOpenDialogBoosts] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false);
  const [uploadImageError, setUploadImageError] = useState(false);

  const [uploadingMetadata, setUploadingMetadata] = useState(false);
  const [uploadMetadataSuccess, setUploadMetadataSuccess] = useState(false);
  const [uploadMetadataError, setUploadMetadataError] = useState(false);

  const [mintingNft, setMintingNft] = useState(false);
  const [mintNftSuccess, setMintNftSuccess] = useState(false);
  const [mintNftError, setMintNftError] = useState(false);

  const [txHash, setTxHash] = useState('');
  const [imageCid, setImageCid] = useState('');
  const [metadataCid, setMetadataCid] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const NewNftSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    externalLink: Yup.string().url('Invalid URL'),
    avatar: Yup.mixed().test('required', 'Image is required', (value) => value !== null)
  });

  const defaultValues = {
    name: '',
    description: '',
    externalLink: '',
    avatar: null,
    properties: [],
    levels: [],
    stats: [],
    boosts: []
  };

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewNftSchema),
    defaultValues
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const { name, description, externalLink, avatar, properties, levels, stats, boosts } = watch();

  useEffect(() => {
    if (selectedChain?.name?.toLowerCase() === chain?.toLowerCase()) {
      setIsNetworkCorrect(true);
    } else {
      setIsNetworkCorrect(false);
    }
  }, [selectedChain, chain]);

  function uploadFileToW3AuthGateway(
    ipfsGateway: string,
    authHeader: string,
    file: File
  ): Promise<any> {
    return new Promise((resolve, reject) => {
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
        const added = await ipfs.add(reader.result as ArrayBuffer).catch((error) => {
          console.log(error);
        });
        if (!added) {
          reject('unable to upload file');
        } else {
          console.log(added.cid.toV0().toString());
          resolve({
            cid: added.cid.toV0().toString(),
            name: file.name || '',
            size: added.size
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }

  async function uploadMetadataW3AuthGateway(authHeader: string, metadata: any): Promise<any> {
    const ipfs = create({
      url: ipfsGateway + '/api/v0',
      headers: {
        authorization: 'Basic ' + authHeader
      }
    });
    const added = await ipfs.add(JSON.stringify(metadata));
    return { cid: added.cid.toV0().toString(), size: added.size };
  }

  const onSubmit = async () => {
    setMintingState('error');
    try {
      if (avatar) {
        // Local variables for retry in case of error
        let newImageCid = imageCid;
        let newMetadataCid = metadataCid;

        // Upload image on IPFS
        if (!uploadImageSuccess) {
          setActiveStep(0);
          setUploadingImage(true);
          const addedFile = await uploadFileToW3AuthGateway(ipfsGateway, AUTH_HEADER, avatar).catch(
            () => {
              setUploadImageError(true);
            }
          );
          setUploadingImage(false);
          if (!addedFile) {
            setUploadImageError(true);
            return;
          }

          pinW3Crust(AUTH_HEADER, addedFile.cid, 'fileName').catch((err) => {
            console.log('Error pin file to Crust Network', err);
          });

          setUploadImageSuccess(true);
          newImageCid = addedFile.cid;
          setImageCid(newImageCid);
        }

        // Upload metadata on IPFS
        if (!uploadMetadataSuccess) {
          setActiveStep(1);
          setUploadingMetadata(true);

          const metadata = {
            name,
            description,
            image: `ipfs://${newImageCid}`,
            external_url: externalLink,
            attributes: [
              ...properties.map((property) => ({
                trait_type: property.propType,
                value: property.name
              })),
              ...levels.map((level) => ({ trait_type: level.levelType, value: level.value })),
              ...stats.map((stat) => ({
                display_type: 'number',
                trait_type: stat.statType,
                value: stat.value
              })),
              ...boosts.map((boost) => ({
                display_type: boost.displayType,
                trait_type: boost.boostType,
                value: boost.value
              }))
            ]
          };

          const addedMetadata = await uploadMetadataW3AuthGateway(AUTH_HEADER, metadata).catch(
            () => {
              setUploadMetadataError(true);
            }
          );
          setUploadingMetadata(false);
          if (!addedMetadata) {
            return;
          }

          pinW3Crust(AUTH_HEADER, addedMetadata.cid, 'fileName')
            .then((res) => {
              console.log('pin ok', res, addedMetadata.cid);
            })
            .catch((err) => {
              console.log('Error pin metadata to Crust Network', err);
            });
          newMetadataCid = addedMetadata.cid;
          setUploadMetadataSuccess(true);
          setMetadataCid(newMetadataCid);
        }

        // Interact with smart contract
        if (!mintNftSuccess) {
          try {
            setActiveStep(2);
            setMintingNft(true);
            const signer = library?.getSigner(account);
            if (signer) {
              const contract = connectRWContract(contractAddr || '', SIMPLIFIED_ERC721_ABI, signer);
              const tx: TransactionResponse = await contract.mint(`ipfs://${newMetadataCid}`);
              setTxHash(tx.hash);
              const txReceipt: TransactionReceipt = await tx.wait(1);
              setTxHash(txReceipt.transactionHash);
              setMintingNft(false);
              setMintNftSuccess(true);
            }
            enqueueSnackbar('Create success!');
            setMintingState('success');
          } catch {
            setMintingNft(false);
            setMintNftSuccess(false);
            setMintNftError(true);
            enqueueSnackbar('Create failed!');
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {!isNetworkCorrect && (
          <Grid item xs={12}>
            <Alert severity="warning">
              You are selecting {selectedChain.name} but the smart contract is generated on {chain},
              you have to change your wallet to the correct network.
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 2 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadNftCard
                name="avatar"
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
                autoComplete="off"
              />
              <NftTextField
                name="externalLink"
                label="External Link"
                description="We will include a link on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
                size="small"
                placeholder="https://your-gallery.com/item-name"
                autoComplete="off"
              />
              <NftTextField
                name="description"
                label="Description"
                description="The description will be included on the item's detail page underneath its image."
                size="small"
                multiline
                minRows={4}
                placeholder="Provide a detailed description of your item."
                autoComplete="off"
              />
              <Stack spacing={1}>
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

                  <Stack sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      {properties.map((property, index) => (
                        <Grid key={index} item xs={6} sm={4} md={3}>
                          <Property {...property} />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Stack>

                <NewPropertiesDialog
                  openDialogProperties={openDialogProperties}
                  // properties={properties}
                  // setProperties={setProperties}
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

                  <Stack spacing={1} sx={{ mt: 1 }}>
                    {levels.map((level, index) => (
                      <LevelProgress key={level.levelType + index} {...level} />
                    ))}
                  </Stack>
                </Stack>

                <NewLevelsDialog
                  openDialogLevels={openDialogLevels}
                  setOpenDialogLevels={setOpenDialogLevels}
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

                  <Stack sx={{ mt: 1 }}>
                    <Grid container spacing={1}>
                      {stats.map((stat, index) => (
                        <Grid key={stat.statType + index} item xs={6}>
                          <StatNumber {...stat} />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Stack>

                <NewStatsDialog
                  openDialogStats={openDialogStats}
                  setOpenDialogStats={setOpenDialogStats}
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

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {boosts.map((boost, index) => (
                      <CircularBoost key={boost.boostType + index} {...boost} />
                    ))}
                  </Stack>
                </Stack>
                <NewBoostsDialog
                  openDialogBoosts={openDialogBoosts}
                  setOpenDialogBoosts={setOpenDialogBoosts}
                />
              </Stack>
            </Stack>

            <NftCreationStatusContext.Provider
              value={{
                uploadingImage,
                uploadImageError,
                uploadImageSuccess,
                uploadingMetadata,
                uploadMetadataError,
                uploadMetadataSuccess,
                mintingNft,
                mintNftError,
                mintNftSuccess,
                txHash,
                activeStep,
                setActiveStep,
                imageCid,
                metadataCid
              }}
            >
              <Box sx={{ display: mintingState === 'notstarted' ? 'none' : 'block' }}>
                <NftCreationStatus />
              </Box>
            </NftCreationStatusContext.Provider>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="info"
                loading={isSubmitting}
                sx={{
                  backgroundColor: '#1A90FF',
                  display: mintingState === 'success' ? 'none' : 'block'
                }}
              >
                {mintingState === 'error' ? 'Try Again' : 'Mint NFT'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
