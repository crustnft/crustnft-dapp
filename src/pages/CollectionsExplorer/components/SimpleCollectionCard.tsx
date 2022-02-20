import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import SailingIcon from '@mui/icons-material/Sailing';
import { Avatar, Divider, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { ColorButton } from 'pages/CollectionViewer/components/NftCard';
import { useEffect, useMemo, useState } from 'react';
import {
  connectContract,
  getContractOwner,
  getName,
  getSymbol,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getRpcUrlByChainId } from 'utils/blockchainHandlers';
import { shortenAddress } from 'utils/formatAddress';

export type CollectionData = {
  contractAddress: string;
  avatarUrl?: string;
  coverUrl?: string;
  description?: string;
  chainId: number;
};

type CollectionCardProps = {
  collection: CollectionData;
};

export default function SimpleCollectionCard({ collection }: CollectionCardProps) {
  const theme = useTheme();
  const { contractAddress, description, avatarUrl, chainId } = collection;
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [contractOwner, setContractOwner] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);

  const contract = useMemo(() => {
    return connectContract(
      contractAddress || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByChainId(chainId)
    );
  }, [contractAddress, chainId]);

  useEffect(() => {
    getName(contract).then((name) => setName(name));
    getSymbol(contract).then((symbol) => setSymbol(symbol));
    getContractOwner(contract).then((contractOwner) => setContractOwner(contractOwner));
    getTotalSupply(contract).then((totalSupply) => setTotalSupply(totalSupply));
  }, []);

  return (
    <Paper sx={{ boxShadow: (theme) => theme.shadows['4'], padding: 3, pb: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="column">
          <Typography variant="caption">{totalSupply} NFTs</Typography>
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Avatar alt="avatar" src="./static/icons/networks/withBackground/ethereum.png" />
      </Stack>
      <Divider sx={{ mx: -3, my: 2 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Link color="inherit" underline="none" href={`#/assets/polygon/${contractAddress}/${''}`}>
          <Typography variant="caption" noWrap>
            Owner
          </Typography>
        </Link>

        <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
          {contractOwner}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Link color="inherit" underline="none" href={`#/assets/polygon/${contractAddress}/${''}`}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" noWrap>
              Token Symbol
            </Typography>
          </Stack>
        </Link>

        <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
          {symbol}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Link color="inherit" underline="none" href={`#/assets/polygon/${contractAddress}/${''}`}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" noWrap>
              Contract Address
            </Typography>
          </Stack>
        </Link>

        <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
          {shortenAddress(contractAddress, 15)}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ mt: 2 }} alignItems="center" justifyContent="space-between">
        <Stack direction="row">
          <Tooltip title="View collection on crustnft.io">
            <IconButton>
              <CenterFocusWeakIcon sx={{ color: '#454F5B' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View collection on opensea.io">
            <IconButton>
              <SailingIcon sx={{ color: '#454F5B' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View on explorer">
            <IconButton>
              <PodcastsIcon sx={{ color: '#454F5B' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Source code">
            <IconButton>
              <IntegrationInstructionsIcon sx={{ color: '#454F5B' }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <ColorButton
          variant="contained"
          size="small"
          disableElevation
          disableFocusRipple
          disableRipple
        >
          <Typography variant="overline" noWrap>
            Mint NFT
          </Typography>
        </ColorButton>
      </Stack>
    </Paper>
  );
}
