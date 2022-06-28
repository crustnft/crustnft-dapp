import { Container, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmptyNFTList, NftItem } from 'services/fetchCollection/createEmptyNFTList';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getName,
  getOwner,
  getSymbol,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import {
  getChainByNetworkName,
  getChainNameByChainId,
  getRpcUrlByNetworkName
} from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import Page from '../../components/Page';
import { NB_NFT_PER_PAGE } from '../../constants/pagination';
import { SIMPLIFIED_ERC721_ABI } from '../../constants/simplifiedERC721ABI';
import NftCard from '../MyNFT/components/NftCard';

export default function CollectionViewer() {
  const { chain, contractAddr, pageNb } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(pageNb || '1'));
  const [pageCount, setPageCount] = useState(1);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(-1);
  const [nftList, setNftList] = useState<NftItem[]>([]);

  const contract = useMemo(() => {
    return connectContract(
      contractAddr || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByNetworkName(chain || '')
    );
  }, [contractAddr, chain]);

  const handlePageChange = (event: any, value: number) => {
    if (value) {
      setPage(value);
    }
  };

  useEffect(() => {
    getTotalSupply(contract)
      .then((totalSupply) => {
        setPageCount(Math.ceil(totalSupply / NB_NFT_PER_PAGE));
        setTotalSupply(totalSupply);
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
    setPage(parseInt(pageNb || '1'));
  }, [pageNb]);

  useEffect(() => {
    navigate(`/collection/${chain}/${contractAddr}/${page}`);
    if (!chain) return;
    const chainInfo = getChainByNetworkName(chain);
    if (!chainInfo) return;
    const { chainId } = chainInfo;
    const fetchNftList = async () => {
      const startIndex = NB_NFT_PER_PAGE * (page - 1);
      const stopIndex = NB_NFT_PER_PAGE * page;
      const numLoadableNFT = stopIndex < totalSupply ? stopIndex : totalSupply;
      if (numLoadableNFT <= 0 || numLoadableNFT <= startIndex) return;
      const emptyNftList = createEmptyNFTList(numLoadableNFT - startIndex);
      setNftList((prevNftList) => emptyNftList);

      let _nftList: NftItem[] = [...emptyNftList.slice(0)];

      for (let i = 0; i < numLoadableNFT - startIndex; i++) {
        const tokenId = i + 1 + startIndex;
        getTokenURI(contract, tokenId)
          .then(async (tokenUri) => {
            if (!tokenUri) return;
            const parsedTokenUri = parseNftUri(tokenUri);
            const data = await getDataFromTokenUri(parsedTokenUri);
            const owner = await getOwner(contract, tokenId);
            const parsedImageUrl = parseNftUri(data.image || '');
            setNftList((prevState) => {
              return [
                ...prevState.slice(0, i),
                {
                  key: contract.address.slice(-4, -1) + tokenId,
                  failToLoad: false,
                  tokenId: tokenId.toString(),
                  tokenURI: tokenUri,
                  imageUrl: parsedImageUrl,
                  name: data.name || '',
                  owner,
                  chainName: getChainNameByChainId(chainId),
                  contractAddr: contract.address
                },
                ...prevState.slice(i + 1)
              ];
            });
          })
          .catch((e: any) => {
            _nftList[i] = { ...nftList[i], failToLoad: true };
          });
      }
    };
    fetchNftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, chain, totalSupply]);

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

        <Stack alignItems="center">
          <Typography variant="h3" sx={{ mb: 3 }}>
            {name}
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
          {/* <Grid item xs={12} md={6}>
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
                sx={{ mb: 1, display: 'block', color: 'text.secondary' }}
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
          </Grid> */}
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
                sx={{ mb: 1, display: 'block', color: 'text.secondary' }}
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
                    Token Name
                  </Typography>
                  <Typography variant="subtitle2">{name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Token Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {totalSupply !== -1 ? (
            nftList
              .filter((nft) => !nft.failToLoad)
              .map((nft) => (
                <Grid key={nft.key + '-' + nft.tokenId} item xs={12} sm={4} md={3}>
                  <NftCard {...nft} />
                </Grid>
              ))
          ) : (
            <></>
          )}
        </Grid>
        <Stack direction="row" justifyContent="center" sx={{ pt: 6 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Stack>
      </Container>
    </Page>
  );
}
