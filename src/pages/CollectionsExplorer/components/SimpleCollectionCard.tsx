import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import SailingIcon from '@mui/icons-material/Sailing';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import useWeb3 from 'hooks/useWeb3';
import { ColorButton } from 'pages/CollectionViewer/components/NftCard';
import { useEffect, useMemo, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import {
  connectContract,
  getContractOwner,
  getName,
  getSymbol,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getChainByChainId, getRpcUrlByChainId } from 'utils/blockchainHandlers';
import { shortenAddress } from 'utils/formatAddress';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography
} from '../../../components/@c-components';

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
  const { account } = useWeb3();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [contractOwner, setContractOwner] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [network, setNetwork] = useState('');
  const [blockExplorerUrl, setBLockExplorerUrl] = useState('');

  const contract = useMemo(() => {
    console.log('RPC', getRpcUrlByChainId(chainId));
    return connectContract(
      contractAddress || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByChainId(chainId)
    );
  }, [contractAddress, chainId]);

  useEffect(() => {
    getName(contract)
      .then((name) => setName(name))
      .catch((e) => {
        console.log(e);
      });
    getSymbol(contract)
      .then((symbol) => setSymbol(symbol))
      .catch((e) => {
        console.log(e);
      });
    getContractOwner(contract)
      .then((contractOwner) => setContractOwner(contractOwner))
      .catch((e) => {
        console.log(e);
      });
    getTotalSupply(contract)
      .then((totalSupply) => setTotalSupply(totalSupply))
      .catch((e) => {
        console.log(e);
      });
    const chain = getChainByChainId(chainId);
    setNetwork(chain?.name || '');
    setBLockExplorerUrl(chain?.blockExplorerUrl || '');
  }, []);

  return (
    <Card>
      <Box sx={{ backgroundColor: '#F4F6F8', p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column">
            <Typography variant="caption">{totalSupply} NFTs</Typography>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
          <Avatar alt="avatar">
            <Jazzicon diameter={40} seed={jsNumberForAddress(contractAddress)} />
          </Avatar>
        </Stack>
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="none">
            <Typography variant="caption" noWrap>
              Network
            </Typography>
          </Link>

          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            {network}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="none">
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
          <Link color="inherit" underline="none">
            <Typography variant="caption" noWrap>
              Owner
            </Typography>
          </Link>

          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            {contractOwner}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="none">
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
              <Link
                underline="none"
                href={`#/collection/${network.toLowerCase()}/${contractAddress}/1`}
                target="_blank"
                rel="noopener"
              >
                <IconButton>
                  <CenterFocusWeakIcon sx={{ color: '#454F5B' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="View collection on opensea.io">
              <IconButton>
                <SailingIcon sx={{ color: '#454F5B' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View on explorer">
              <Link
                href={`${blockExplorerUrl}/address/${contractAddress}#readContract`}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <IconButton>
                  <PodcastsIcon sx={{ color: '#454F5B' }} />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Source code">
              <Link
                href={`${blockExplorerUrl}/address/${contractAddress}#code`}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <IconButton>
                  <IntegrationInstructionsIcon sx={{ color: '#454F5B' }} />
                </IconButton>
              </Link>
            </Tooltip>
          </Stack>
          {account?.toLowerCase() === contractOwner?.toLowerCase() && (
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
          )}
        </Stack>
      </Box>
    </Card>
  );
}
