import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QuestionIcon } from 'assets/icons/customIcons';
import { getContractsByAccount } from 'clients/crustnft-explore-api/contracts';
import Image from 'components/Image';
import { CustomFile } from 'components/upload/type';
import { AUTH_HEADER, IPFS_GATEWAY } from 'constants/ipfsGateways';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { create } from 'ipfs-http-client';
import isString from 'lodash/isString';
import { useSnackbar } from 'notistack';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import { pinW3Crust } from 'services/w3AuthIpfs';
import { Theme } from 'theme';
import * as Yup from 'yup';
import { FormProvider, RHFUploadMultiFile } from '../../../components/hook-form';
import { MintContext } from '../MintNft';
import type { BoostProps, LevelProps, PropertyProps, StatProps } from '../MintNft.types';
import Property from './/Property';
import CircularBoost from './CircularBoost';
import CollectionInfo from './CollectionInfo';
import LevelProgress from './LevelProgress';
import NewBoostsDialog from './NewBoostsDialog';
import NewLevelsDialog from './NewLevelsDialog';
import NewPropertiesDialog from './NewPropertiesDialog';
import NewStatsDialog from './NewStatsDialog';
import NftCreationStatus from './NftCreationStatus';
import NftTextField from './NftTextField';
import StatNumber from './StatNumber';

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

type TNftCreationStatus = {
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

export const NftCreationStatusContext = createContext<TNftCreationStatus>(initialNftCreationStatus);

type FormValues = {
  name: string;
  description: string;
  externalLink: string;
  avatar: CustomFile | null;
  properties: PropertyProps[];
  levels: LevelProps[];
  stats: StatProps[];
  boosts: BoostProps[];
  images: File[];
};

export default function NftForm() {
  const { accessToken } = useAuth();
  const [collections, setCollections] = useState<any[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const { account, library } = useWeb3();
  const [mintingState, setMintingState] = useState<'notstarted' | 'success' | 'error'>(
    'notstarted'
  );
  const [contractAddr, setContractAddr] = useState('');

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

  const theme = useTheme() as Theme;
  const { setTab } = useContext(MintContext);

  const NewNftSchema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
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
    boosts: [],
    images: []
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
    if (account && accessToken) {
      getContractsByAccount(accessToken, 50, account.toLowerCase()).then((res) => {
        console.log(
          res.data?.data?.filter((collection: any) => collection.collectionType === 'expandable')
        );
        setCollections(
          res.data?.data?.filter((collection: any) => collection.collectionType === 'expandable')
        );
      });
    }
  }, [account, accessToken]);

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

  async function uploadMetadataW3AuthGateway(
    authHeader: string,
    ipfsGateway: string,
    metadata: any
  ): Promise<any> {
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
          const addedFile = await uploadFileToW3AuthGateway(
            IPFS_GATEWAY,
            AUTH_HEADER,
            avatar
          ).catch(() => {
            setUploadImageError(true);
          });
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

          const addedMetadata = await uploadMetadataW3AuthGateway(
            AUTH_HEADER,
            IPFS_GATEWAY,
            metadata
          ).catch(() => {
            setUploadMetadataError(true);
          });
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
              try {
                const contract = connectRWContract(
                  contractAddr || '',
                  SIMPLIFIED_ERC721_ABI,
                  signer
                );
                const tx: TransactionResponse = await contract.mint(`ipfs://${newMetadataCid}`);
                setTxHash(tx.hash);
                const txReceipt: TransactionReceipt = await tx.wait(1);
                setTxHash(txReceipt.transactionHash);
              } catch (e: any) {
                if (e.reason === 'repriced') {
                  setTxHash(e.receipt.transactionHash);
                } else {
                  throw new Error(e);
                }
              }
              setMintingNft(false);
              setMintNftSuccess(true);
              enqueueSnackbar('Create success!');
              setMintingState('success');
            }
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
        <Grid item xs={12} md={9}>
          <Stack sx={{ p: 3 }}>
            <RHFUploadMultiFile
              name="avatar"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={() => {}}
            />
            <Stack spacing={2} sx={{ mt: '25px' }}>
              <Typography variant="h5" color="text.primary">
                Item details
              </Typography>
              <NftTextField
                name="name"
                label="Item name"
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
              <Stack>
                <Stack sx={{ mb: '20px' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1">Properties</Typography>
                      <Tooltip
                        title="Textual traits that show up as rectangles"
                        placement="top"
                        arrow={true}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </Stack>

                    <Button
                      sx={{
                        width: '50%',
                        maxWidth: '200px',
                        border: '2px solid',
                        borderColor: theme.palette.textField.borderColor,
                        py: '11px',

                        '&:hover': {
                          border: '2px solid',
                          borderColor: theme.palette.primary.main
                        }
                      }}
                      onClick={() => {
                        setOpenDialogProperties(true);
                      }}
                      variant="outlined"
                    >
                      <Typography
                        variant="buttonMedium"
                        color="text.primary"
                        sx={{
                          textTransform: 'none',
                          '& >span': {
                            mr: '10px'
                          }
                        }}
                      >
                        <span>+</span> Add Properties
                      </Typography>
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

                <Stack sx={{ mb: '20px' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1">Levels</Typography>
                      <Tooltip
                        title="Numerical traits that show as a progress bar"
                        placement="top"
                        arrow={true}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </Stack>

                    <Button
                      sx={{
                        width: '50%',
                        maxWidth: '200px',
                        border: '2px solid',
                        borderColor: theme.palette.textField.borderColor,
                        py: '11px',

                        '&:hover': {
                          border: '2px solid',
                          borderColor: theme.palette.primary.main
                        }
                      }}
                      onClick={() => {
                        setOpenDialogLevels(true);
                      }}
                      variant="outlined"
                    >
                      <Typography
                        variant="buttonMedium"
                        color="text.primary"
                        sx={{
                          textTransform: 'none',
                          '& >span': {
                            mr: '10px'
                          }
                        }}
                      >
                        <span>+</span> Add Levels
                      </Typography>
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

                <Stack sx={{ mb: '20px' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1">Stats</Typography>
                      <Tooltip
                        title="Numerical traits that just show as numbers"
                        placement="top"
                        arrow={true}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </Stack>

                    <Button
                      sx={{
                        width: '50%',
                        maxWidth: '200px',
                        border: '2px solid',
                        borderColor: theme.palette.textField.borderColor,
                        py: '11px',

                        '&:hover': {
                          border: '2px solid',
                          borderColor: theme.palette.primary.main
                        }
                      }}
                      onClick={() => {
                        setOpenDialogStats(true);
                      }}
                      variant="outlined"
                    >
                      <Typography
                        variant="buttonMedium"
                        color="text.primary"
                        sx={{
                          textTransform: 'none',
                          '& >span': {
                            mr: '10px'
                          }
                        }}
                      >
                        <span>+</span> Add Stats
                      </Typography>
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

                <Stack sx={{ mb: '20px' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1">Boosts</Typography>
                      <Tooltip
                        title="Number or percentage boosts that show up as a circular boost"
                        placement="top"
                        arrow={true}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </Stack>

                    <Button
                      sx={{
                        width: '50%',
                        maxWidth: '200px',
                        border: '2px solid',
                        borderColor: theme.palette.textField.borderColor,
                        py: '11px',
                        '&:hover': {
                          border: '2px solid',
                          borderColor: theme.palette.primary.main
                        }
                      }}
                      onClick={() => {
                        setOpenDialogBoosts(true);
                      }}
                      variant="outlined"
                    >
                      <Typography
                        variant="buttonMedium"
                        color="text.primary"
                        sx={{
                          textTransform: 'none',
                          '& >span': {
                            mr: '10px'
                          }
                        }}
                      >
                        <span>+</span> Add Boots
                      </Typography>
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

            <Typography variant="h5" color="text.primary" sx={{ my: '30px' }}>
              Choose your Collection
            </Typography>
            <Box sx={{ width: '100%', aspectRatio: '4' }}>
              <Stack
                direction="row"
                sx={{
                  mt: 1,
                  height: '100%',
                  flexGrow: 1,
                  maxWidth: '100%',
                  overflowX: 'overlay',
                  '&:hover': {
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.primary.light
                    }
                  },
                  '&::-webkit-scrollbar': {
                    height: '8px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main
                    }
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'inherit'
                  }
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    height: 'calc(100% - 30px)',
                    minWidth: 'unset',
                    backgroundColor:
                      contractAddr === '' ? 'accent.lighter' : 'background.secondary',
                    border: '2px dashed',
                    borderColor: contractAddr === '' ? 'accent.main' : 'background.quinary',
                    mx: '15px',
                    aspectRatio: '1',
                    '&:hover': {
                      border: '2px solid'
                    }
                  }}
                  onClick={() => {
                    setContractAddr('');
                  }}
                >
                  <Stack alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="text.tertiary"
                      sx={{ textTransform: 'none' }}
                      gutterBottom
                    >
                      New collection
                    </Typography>
                    <Button
                      sx={{
                        p: '11px 22px',
                        '& span': { mr: '13px' },
                        backgroundColor: 'accent.main',
                        '&:hover': {
                          backgroundColor: 'accent.main'
                        }
                      }}
                    >
                      <Typography variant="buttonMedium" color="grey.0">
                        <span>+</span>Create
                      </Typography>
                    </Button>
                  </Stack>
                </Button>

                {collections.map((collection) => (
                  <CollectionInfo
                    key={collection.id}
                    contractAddr={collection.contractAddress}
                    chainId={collection.chainId}
                    onClick={() => {
                      setContractAddr(collection.contractAddress);
                    }}
                    sx={{
                      height: 'calc(100% - 30px)',
                      backgroundColor:
                        contractAddr === collection.contractAddress
                          ? 'accent.lighter'
                          : 'background.secondary',
                      border: '2px solid',
                      borderColor:
                        contractAddr === collection.contractAddress
                          ? 'accent.main'
                          : 'background.quinary',
                      mx: '15px',
                      aspectRatio: '1',
                      '&:hover': {
                        border: '2px solid'
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

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
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ py: 2, px: 2 }}>
            <Box sx={{ mb: 5 }}>
              <Image
                alt="avatar"
                src={
                  isString(avatar)
                    ? avatar
                    : avatar
                    ? avatar.preview
                    : 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg'
                }
                sx={{ zIndex: 8 }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Stack sx={{ mt: 3 }} direction="row" width="100%">
            <Button
              variant="contained"
              sx={{
                py: '11px',
                mr: '20px',
                flex: 1,
                maxWidth: '200px',
                boxShadow: theme.customShadows.z12,
                backgroundColor: theme.palette.background.quaternary,
                '&:hover': {
                  backgroundColor: theme.palette.background.quinary
                }
              }}
              onClick={() => {
                setTab('General');
              }}
            >
              <Typography
                variant="buttonLarge"
                color="text.primary"
                sx={{ textTransform: 'capitalize' }}
              >
                Back
              </Typography>
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              color="info"
              loading={isSubmitting}
              sx={{
                py: '11px',
                flex: 1,
                maxWidth: '200px',
                backgroundColor: theme.palette.primary.main,
                display: mintingState === 'success' ? 'none' : 'block',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              <Typography variant="buttonLarge" sx={{ textTransform: 'capitalize' }}>
                {mintingState === 'error' ? 'Try Again' : 'Mint NFT'}
              </Typography>
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
