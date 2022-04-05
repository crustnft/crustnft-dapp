import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  createCollection,
  getCollection,
  updateCollection
} from 'clients/crustnft-explore-api/collections';
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { AUTH_HEADER, IPFS_GATEWAY } from 'constants/ipfsGateways';
import { BigNumber, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useSnackbarAction from 'hooks/useSnackbarAction';
import useWeb3 from 'hooks/useWeb3';
import { create } from 'ipfs-http-client';
import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { connectContract, connectRWContract } from 'services/smartContract/evmCompatible';
import { pinW3Crust } from 'services/w3AuthIpfs';
import { getChainIdByNetworkName, getRpcUrlByNetworkName } from 'utils/blockchainHandlers';
import { getUrlFromCid } from 'utils/ipfsHandlers';
import Page from '../../components/Page';
const MintingCard = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundImage'
})<{ backgroundImage: string }>(({ backgroundImage }) => ({
  position: 'relative',
  /* From https://css.glass */
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  // backdropFilter: 'blur(5px)',
  // WebkitBackdropFilter: 'blur(5px)',
  border: '12px solid rgba(255, 255, 255)',
  backgroundImage: backgroundImage
    ? `url(${backgroundImage})`
    : 'url("https://img.freepik.com/free-vector/ocean-sea-beach-nature-tranquil-landscape_33099-2248.jpg?w=1300")',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

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

export interface CustomFile extends File {
  preview?: string;
}

export default function MintCPNft() {
  const { chain, contractAddr } = useParams();

  const theme = useTheme();

  const { accessToken, isAuthenticated } = useAuth();
  const { account, library, signInWallet } = useWeb3();

  const [chainId, setChainId] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('ETH');

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [paused, setPaused] = useState(false);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState<any>(undefined);
  const onSnackbarAction = useSnackbarAction();

  useEffect(() => {
    const initialize = async () => {
      if (!(chain && contractAddr)) return;
      const chainId = getChainIdByNetworkName(chain);
      if (!chainId) return;
      setChainId(chainId);
      const _collectionInfo = await getCollection(chainId.toString() + '-' + contractAddr);
      if (_collectionInfo) {
        setCollectionInfo(_collectionInfo);
      }
      console.log(_collectionInfo);
    };

    initialize();
  }, [chain, contractAddr]);

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

      readOnlyContract.owner().then((owner: string) => {
        setOwner(owner);
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

  function uploadFileToW3AuthGateway(
    ipfsGateway: string,
    authHeader: string,
    file: CustomFile
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
          console.log('!added');
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

  const [fileX, setFileX] = useState<CustomFile | null>(null);

  const handleDropFileX = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileX(
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    }
  };

  const handleUploadCover = async () => {
    if (account?.toLowerCase() === owner.toLowerCase()) {
      if (!isAuthenticated) {
        await signInWallet();
      }

      if (!fileX || !readOnlyContract || !chainId || !contractAddr) {
        onSnackbarAction('warning', 'Please select the cover!', null);
        return;
      }
      const addedFile = await uploadFileToW3AuthGateway(IPFS_GATEWAY, AUTH_HEADER, fileX);
      if (!addedFile) return;

      pinW3Crust(AUTH_HEADER, addedFile.cid, addedFile.name);

      const _collectionInfo = await getCollection(chainId.toString() + '-' + contractAddr);

      if (!_collectionInfo) {
        await createCollection(accessToken, {
          id: chainId.toString() + '-' + contractAddr,
          account: owner
        });
      }

      const updatedCollection = await updateCollection(accessToken, {
        id: chainId.toString() + '-' + contractAddr,
        account: owner,
        coverCID: addedFile.cid
      });

      if (updatedCollection) {
        onSnackbarAction('success', 'Change cover successfully', null);
      } else {
        onSnackbarAction('warning', 'Try again', null);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    accept: 'image/*',
    maxSize: 11457280,
    onDrop: handleDropFileX
  });

  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <MintingCard
          backgroundImage={
            fileX?.preview
              ? fileX.preview
              : collectionInfo?.coverCID
              ? getUrlFromCid(collectionInfo.coverCID)
              : ''
          }
        >
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
            sx={{ height: '100%', py: 2, pt: '40vh' }}
          >
            <GlassWrapper>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
                sx={{ height: '100%', p: 1 }}
              >
                <Typography variant="h3" color="white" sx={{ textAlign: 'center' }}>
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
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, ml: 1, display: account !== owner ? 'none' : 'flex' }}
          >
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Button color="info" variant="contained" size="small">
                Change Cover
              </Button>
            </div>
            <Button color="info" variant="contained" size="small" onClick={handleUploadCover}>
              Save
            </Button>
          </Stack>
        </MintingCard>
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
  width: '35%',
  minWidth: '240px'
});
