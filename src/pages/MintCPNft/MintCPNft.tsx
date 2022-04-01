import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { BigNumber, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { create } from 'ipfs-http-client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { connectContract, connectRWContract } from 'services/smartContract/evmCompatible';
import { getRpcUrlByNetworkName } from 'utils/blockchainHandlers';
import * as Yup from 'yup';
import { FormProvider, RHFUploadNftCard } from '../../components/hook-form';
import Page from '../../components/Page';
import { fData } from '../../utils/formatNumber';

const MintingCard = styled('div')({
  position: 'relative',
  /* From https://css.glass */
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  // backdropFilter: 'blur(5px)',
  // WebkitBackdropFilter: 'blur(5px)',
  border: '12px solid rgba(255, 255, 255)',
  backgroundImage:
    'url("https://img.freepik.com/free-vector/ocean-sea-beach-nature-tranquil-landscape_33099-2248.jpg?w=1300")',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}));

const BootstrapInput = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #ced4da',
  alignContent: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderRadius: 4,
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
  }
}));

export default function MintCPNft() {
  const { chain, contractAddr } = useParams();

  const theme = useTheme();

  const { accessToken } = useAuth();
  const { account, library } = useWeb3();

  const [chainId, setChainId] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('ETH');

  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [paused, setPaused] = useState(false);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {}, [chain]);

  const readOnlyContract = useMemo(() => {
    if (!(contractAddr && chain)) return;
    return connectContract(contractAddr, cryptopunksABI, getRpcUrlByNetworkName(chain));
  }, [chain, contractAddr]);

  const contract = useMemo(() => {
    if (contractAddr && library && account) {
      const signer = library?.getSigner(account);
      if (!signer) return;
      return connectRWContract(contractAddr, cryptopunksABI, signer);
    }
  }, [contractAddr, library, account]);

  useEffect(() => {
    if (readOnlyContract) {
      readOnlyContract.paused().then((paused: boolean) => {
        setPaused(paused);
      });

      readOnlyContract.name().then((name: string) => {
        setName(name);
      });

      readOnlyContract.totalSupply().then((totalSupply: BigNumber) => {
        setTotalSupply(totalSupply.toNumber());
      });

      readOnlyContract.maxSupply().then((maxSupply: BigNumber) => {
        setMaxSupply(maxSupply.toNumber());
      });

      readOnlyContract.maxMintAmountPerTx().then((maxMintAmountPerTx: BigNumber) => {
        console.log('maxMintAmountPerTx', maxMintAmountPerTx.toNumber());
        setMaxMintAmountPerTx(maxMintAmountPerTx.toNumber());
      });
      readOnlyContract.cost().then((tokenPrice: BigNumber) => {
        setTokenPrice(parseFloat(utils.formatEther(tokenPrice)));
      });
      readOnlyContract.whitelistMintEnabled().then((isWhitelistMintEnabled: boolean) => {
        setIsWhitelistMintEnabled(isWhitelistMintEnabled);
      });
      readOnlyContract.revealed().then((revealed: boolean) => {
        setRevealed(revealed);
      });
    }
  }, [readOnlyContract]);

  const onMintHandle = async (amount: number) => {
    let _amount = amount;
    if (!contract || amount === 0) return;
    if (amount > maxSupply - totalSupply) {
      setNbOfNftToMint(maxSupply - totalSupply);
      _amount = maxSupply - totalSupply;
    }

    const tokenPrice: BigNumber = await contract.cost();
    const tx = await contract.mint(_amount, { value: tokenPrice.mul(_amount) });
    console.log('tx', tx);
    const _tx = await tx.wait();
    console.log('_tx', _tx);
    const tokenId = _tx.events[0].args[2];
    console.log('tokenId', tokenId);
  };

  const [nbOfNftToMint, setNbOfNftToMint] = useState(1);
  const [openUploadCover, setOpenUploadCover] = useState(false);

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

  const CoverSchema = Yup.object().shape({
    cover: Yup.mixed().test('required', 'Image is required', (value) => value !== null)
  });

  const defaultValues = {
    cover: null
  };

  const methods = useForm<{ cover: File | null }>({
    mode: 'onTouched',
    resolver: yupResolver(CoverSchema),
    defaultValues
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = () => {
    console.log('httlo');
  };

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <MintingCard>
          <Stack alignItems="center" sx={{ mt: 1 }}>
            <StyledToggleButtonGroup size="small" value="center" exclusive>
              <ToggleButton
                value="left"
                aria-label="left aligned"
                href="https://opensea.io"
                target="_blank"
              >
                <Icon icon="icon-park-outline:sailboat" width="24px" />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <Icon icon="logos:c" width="24px" />
              </ToggleButton>
              <ToggleButton value="right" aria-label="centered">
                <Icon icon="clarity:info-standard-line" width="24px" />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Stack>

          <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ height: '100%', py: 3, pt: '50vh' }}
          >
            <GlassWrapper>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
                sx={{ height: '100%', p: 2 }}
              >
                <Typography variant="h2" color="white" sx={{ textAlign: 'center' }}>
                  {totalSupply}/{maxSupply}
                  <Typography color="white" sx={{ mt: -2, display: 'block', textAlign: 'center' }}>
                    Minted
                  </Typography>
                </Typography>

                <Stack direction="row" spacing={2}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => {
                      setNbOfNftToMint((prev) => {
                        if (prev - 1 >= 0) return prev - 1;
                        return prev;
                      });
                    }}
                  >
                    <Icon icon="akar-icons:circle-minus-fill" color="#98E1FE" />
                  </IconButton>
                  <BootstrapInput>
                    <Stack sx={{ py: 1, px: 4 }}>
                      <Typography variant="h4">{nbOfNftToMint}</Typography>
                    </Stack>
                  </BootstrapInput>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                      setNbOfNftToMint((prev) => {
                        if (prev + 1 <= maxMintAmountPerTx) return prev + 1;
                        return prev;
                      });
                    }}
                  >
                    <Icon icon="akar-icons:circle-plus-fill" color="#98E1FE" />
                  </IconButton>
                </Stack>

                <Button
                  size="small"
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    onMintHandle(nbOfNftToMint);
                  }}
                  sx={{ px: 8 }}
                >
                  Mint
                </Button>
              </Stack>
            </GlassWrapper>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<Icon icon="ant-design:upload-outlined" />}
            sx={{ position: 'absolute', right: 5, bottom: 5 }}
            onClick={() => {
              setOpenUploadCover(true);
            }}
          >
            Upload Cover
          </Button>
        </MintingCard>

        <Dialog
          open={openUploadCover}
          onClose={() => {
            setOpenUploadCover(false);
          }}
          fullWidth
          maxWidth="sm"
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <RHFUploadNftCard
                name="cover"
                accept="image/*"
                maxSize={11457280}
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
                    <br /> max size of {fData(11457280)}
                  </Typography>
                }
              />
            </DialogContent>
            <DialogActions>
              <LoadingButton
                type="submit"
                variant="contained"
                color="info"
                loading={isSubmitting}
                sx={{
                  backgroundColor: '#1A90FF'
                }}
              >
                Upload
              </LoadingButton>
              <Button
                onClick={() => {
                  setOpenUploadCover(false);
                }}
                autoFocus
              >
                Close
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      </Container>
    </Page>
  );
}

const GlassWrapper = styled(Box)({
  /* From https://css.glass */
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  width: '50%'
});
