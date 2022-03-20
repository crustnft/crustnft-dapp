import { Button, Container, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Identicons from '@nimiq/identicons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmptyNFTList, nftItem } from 'services/fetchCollection/createEmptyNFTList';
import { getNftList4CollectionCard } from 'services/fetchCollection/getNFTList';
import {
  connectContract,
  getName,
  getSymbol,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getChainByNetworkName, getRpcUrlByNetworkName } from 'utils/blockchainHandlers';
import NftCard from '../../components/NftCard';
import Page from '../../components/Page';
import { NB_NFT_PER_ROW } from '../../constants/pagination';
import { SIMPLIFIED_ERC721_ABI } from '../../constants/simplifiedERC721ABI';
import { ProfileCoverProps } from './components/ProfileCover';
Identicons.svgPath = './static/identicons.min.svg';

export default function CollectionViewer() {
  const { chain, contractAddr, rowNb } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(parseInt(rowNb || '1'));
  const [rowCount, setRowCount] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(-1);
  const [NftList, setNftList] = useState<nftItem[]>([]);

  const contract = useMemo(() => {
    return connectContract(
      contractAddr || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByNetworkName(chain || '')
    );
  }, [contractAddr, chain]);

  useEffect(() => {
    getTotalSupply(contract)
      .then((totalSupply) => {
        setRowCount(Math.ceil(totalSupply / NB_NFT_PER_ROW));
        setTotalSupply(totalSupply);
        setNftList(createEmptyNFTList(totalSupply < NB_NFT_PER_ROW ? totalSupply : NB_NFT_PER_ROW));
      })
      .catch((e) => {
        console.log(e);
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chain) return;
    const chainInfo = getChainByNetworkName(chain);
    if (!chainInfo) return;
    const { chainId } = chainInfo;
    if (row > 1) {
      const emptyList = createEmptyNFTList(
        NB_NFT_PER_ROW * row <= totalSupply
          ? NB_NFT_PER_ROW
          : totalSupply - NB_NFT_PER_ROW * (row - 1)
      );
      setNftList((prev) => [...prev, ...emptyList]);
    }

    const fetchNftList = async () => {
      const _nftList = await getNftList4CollectionCard(
        contract,
        chainId,
        totalSupply,
        NB_NFT_PER_ROW * (row - 1),
        NB_NFT_PER_ROW * row <= totalSupply ? NB_NFT_PER_ROW * row : totalSupply
      );
      if (!_nftList) return;
      setNftList((prev) => {
        let current = JSON.parse(JSON.stringify(prev));
        for (let i = 0; i < _nftList.length; i++) {
          current[current.length - i - 1] = _nftList[_nftList.length - i - 1];
        }
        return current;
      });
      setLoading(false);
    };
    fetchNftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, chain, totalSupply]);

  const [profileCover, setProfileCover] = useState<ProfileCoverProps>({
    coverUrl: 'https://public.nftstatic.com/static/nft/res/d06f4b2332c740658c1f081b2b74ed4b.png',
    avatarUrl: ''
  });

  useEffect(() => {
    Identicons.toDataUrl(contractAddr).then((img: string) => {
      setProfileCover((prevProfileCover) => ({ ...prevProfileCover, avatarUrl: img }));
    });
  }, [contractAddr]);
  //  profileCover = { coverUrl: '', avatarUrl: '' };
  return (
    <Page title={`Collection - ${name}`}>
      <Container maxWidth="lg">
        {/* <Box
          sx={{
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover {...profileCover} />
        </Box> */}

        {/* <Box sx={{ height: 64 }} />
        <Stack alignItems="center">
          <Typography variant="h3" sx={{ mb: 3 }}>
            {name}
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Description
              </Typography>
              <Typography variant="body2">
                The rapid evolution of the blockchain world has forced the One-Eyes to evolve in
                order to raise an army to fight for the meta universe. The result is the 10,000th
                EVO Squad - the goal of which is to take over the space for future 3D One-Eyed
                Avatars. Join our squad . One of the goals of the project is to raise funds to fight
                childhood cancer. Don't be indifferent. Community links in the profile description .
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Preview Collection
              </Typography>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2">{name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper>
                  <Chip size="small" label="Burnable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid> */}
        <Grid container spacing={4}>
          {totalSupply !== -1 ? (
            NftList.filter((nft) => !nft.failToLoad).map((nft) => (
              <Grid key={nft.key + '-' + nft.tokenId} item xs={12} sm={4} md={3}>
                <NftCard {...nft} />
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
        {row < rowCount ? (
          <Stack direction="row" justifyContent="center" sx={{ pt: 3 }}>
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setRow((prev) => {
                  return prev + 1;
                });
              }}
              sx={{ borderRadius: 3, px: 5 }}
            >
              <Typography variant="h5">See More</Typography>
            </Button>
          </Stack>
        ) : (
          <></>
        )}
      </Container>
    </Page>
  );
}
