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
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { BigNumber, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import Page from '../../components/Page';
type LegendProps = {
  label: string;
  number: number;
};

const MintingCard = styled('div')({
  /* From https://css.glass */
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  // backdropFilter: 'blur(5px)',
  // WebkitBackdropFilter: 'blur(5px)',
  border: '12px solid rgba(255, 255, 255)',
  backgroundImage:
    'url("https://img.freepik.com/free-vector/ocean-sea-beach-nature-tranquil-landscape_33099-2248.jpg?w=1300")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '90vh'
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

  const contract = useMemo(() => {
    if (contractAddr && library && account) {
      const signer = library?.getSigner(account);
      if (!signer) return;
      return connectRWContract(contractAddr, cryptopunksABI, signer);
    }
  }, [contractAddr, library, account]);

  useEffect(() => {
    if (contract) {
      contract.paused().then((paused: boolean) => {
        setPaused(paused);
      });

      contract.name().then((name: string) => {
        setName(name);
      });

      contract.totalSupply().then((totalSupply: BigNumber) => {
        setTotalSupply(totalSupply.toNumber());
      });

      contract.maxSupply().then((maxSupply: BigNumber) => {
        setMaxSupply(maxSupply.toNumber());
      });

      contract.maxMintAmountPerTx().then((maxMintAmountPerTx: BigNumber) => {
        console.log('maxMintAmountPerTx', maxMintAmountPerTx.toNumber());
        setMaxMintAmountPerTx(maxMintAmountPerTx.toNumber());
      });
      contract.cost().then((tokenPrice: BigNumber) => {
        setTokenPrice(parseFloat(utils.formatEther(tokenPrice)));
      });
      contract.whitelistMintEnabled().then((isWhitelistMintEnabled: boolean) => {
        setIsWhitelistMintEnabled(isWhitelistMintEnabled);
      });
      contract.revealed().then((revealed: boolean) => {
        setRevealed(revealed);
      });
    }
  }, [contract]);

  const onMintHandle = async (amount: number) => {
    if (!contract) return;
    const tokenPrice: BigNumber = await contract.cost();
    const tx = await contract.mint(amount, { value: tokenPrice.mul(amount) });
    console.log('tx', tx);
    const _tx = await tx.wait();
    console.log('_tx', _tx);
    const tokenId = _tx.events[0].args[2];
    console.log('tokenId', tokenId);
  };

  const [nbOfNftToMint, setNbOfNftToMint] = useState(1);

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
            sx={{ height: '100%', pt: 10 }}
          >
            <Stack direction="column" spacing={2}>
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
              >
                Mint
              </Button>
            </Stack>
          </Stack>
        </MintingCard>
      </Container>
    </Page>
  );
}
