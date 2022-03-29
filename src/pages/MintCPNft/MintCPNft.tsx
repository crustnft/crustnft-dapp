import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme } from '@mui/material/styles';
import BaseOptionChart from 'components/chart/BaseOptionChart';
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { BigNumber, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import merge from 'lodash/merge';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import { fNumber } from 'utils/formatNumber';
import Page from '../../components/Page';

const CHART_DATA = [75];
const SOLD_OUT = 120;
const AVAILABLE = 66;

type LegendProps = {
  label: string;
  number: number;
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
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

  const chartOptions = useMemo(() => {
    return merge(BaseOptionChart(), {
      legend: { show: false },
      grid: {
        padding: { top: -32, bottom: -32 }
      },
      fill: {
        type: 'gradient',
        gradient: {
          colorStops: [
            [
              { offset: 0, color: theme.palette.primary.light },
              { offset: 100, color: theme.palette.primary.main }
            ]
          ]
        }
      },
      plotOptions: {
        radialBar: {
          hollow: { size: '64%' },
          dataLabels: {
            name: { offsetY: -16 },
            value: { offsetY: 8 },
            total: {
              label: 'NFTs',
              formatter: () => fNumber(totalSupply)
            }
          }
        }
      }
    });
  }, [totalSupply, theme]);
  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <Card>
          <CardHeader title={`# ${name}`} sx={{ mb: 8 }} />
          <ReactApexChart
            type="radialBar"
            series={[totalSupply / maxSupply]}
            options={chartOptions}
            height={310}
          />

          <Stack spacing={2} sx={{ p: 5 }}>
            <Legend label="Minted" number={totalSupply} />
            <Legend label="Available" number={maxSupply - totalSupply} />
            <Divider />
            <Typography variant="overline">Mint NFT in this collection</Typography>
            <Typography variant="caption">Number of NFTs</Typography>
            <Stack direction="row" spacing={2}>
              <BootstrapInput id="demo-customized-textbox" />
              <Button size="small" color="warning" variant="contained">
                Mint
              </Button>
            </Stack>
          </Stack>
          <Stack></Stack>
        </Card>
      </Container>
    </Page>
  );
}

function Legend({ label, number }: LegendProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Minted' && {
              bgcolor: 'primary.main'
            })
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number} NFTs</Typography>
    </Stack>
  );
}
