import { Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ButtonPopover from 'components/ButtonPopover';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NftItem } from 'services/fetchCollection/createEmptyNFTList';
import Page from '../../components/Page';

export default function CollectionViewer() {
  const { chain, contractAddr, pageNb } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(pageNb || '1'));
  const [pageCount, setPageCount] = useState(1);
  const [name, setName] = useState('Name');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(-1);
  const [nftList, setNftList] = useState<NftItem[]>([]);

  // const contract = useMemo(() => {
  //   return connectContract(
  //     contractAddr || '',
  //     SIMPLIFIED_ERC721_ABI,
  //     getRpcUrlByNetworkName(chain || '')
  //   );
  // }, [contractAddr, chain]);

  // const handlePageChange = (event: any, value: number) => {
  //   if (value) {
  //     setPage(value);
  //   }
  // };

  // useEffect(() => {
  //   getTotalSupply(contract)
  //     .then((totalSupply) => {
  //       setPageCount(Math.ceil(totalSupply / NB_NFT_PER_PAGE));
  //       setTotalSupply(totalSupply);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   getName(contract)
  //     .then((name) => setName(name))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   getSymbol(contract)
  //     .then((symbol) => setSymbol(symbol))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   setPage(parseInt(pageNb || '1'));
  // }, [pageNb]);

  // useEffect(() => {
  //   navigate(`/collection/${chain}/${contractAddr}/${page}`);
  //   if (!chain) return;
  //   const chainInfo = getChainByNetworkName(chain);
  //   if (!chainInfo) return;
  //   const { chainId } = chainInfo;
  //   const fetchNftList = async () => {
  //     const startIndex = NB_NFT_PER_PAGE * (page - 1);
  //     const stopIndex = NB_NFT_PER_PAGE * page;
  //     const numLoadableNFT = stopIndex < totalSupply ? stopIndex : totalSupply;
  //     if (numLoadableNFT <= 0 || numLoadableNFT <= startIndex) return;
  //     const emptyNftList = createEmptyNFTList(numLoadableNFT - startIndex);
  //     setNftList((prevNftList) => emptyNftList);

  //     let _nftList: NftItem[] = [...emptyNftList.slice(0)];

  //     for (let i = 0; i < numLoadableNFT - startIndex; i++) {
  //       const tokenId = i + 1 + startIndex;
  //       getTokenURI(contract, tokenId)
  //         .then(async (tokenUri) => {
  //           if (!tokenUri) return;
  //           const parsedTokenUri = parseNftUri(tokenUri);
  //           const data = await getDataFromTokenUri(parsedTokenUri);
  //           const owner = await getOwner(contract, tokenId);
  //           const parsedImageUrl = parseNftUri(data.image || '');
  //           setNftList((prevState) => {
  //             return [
  //               ...prevState.slice(0, i),
  //               {
  //                 key: contract.address.slice(-4, -1) + tokenId,
  //                 failToLoad: false,
  //                 tokenId: tokenId.toString(),
  //                 tokenURI: tokenUri,
  //                 imageUrl: parsedImageUrl,
  //                 name: data.name || '',
  //                 owner,
  //                 chainName: getChainNameByChainId(chainId),
  //                 contractAddr: contract.address
  //               },
  //               ...prevState.slice(i + 1)
  //             ];
  //           });
  //         })
  //         .catch((e: any) => {
  //           _nftList[i] = { ...nftList[i], failToLoad: true };
  //         });
  //     }
  //   };
  //   fetchNftList();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, chain, totalSupply]);

  const SORT_BY = ['Recently added', 'Name'];
  const [sortBy, setSortBy] = useState(SORT_BY[0]);
  const theme = useTheme();

  return (
    <Page title={`Collection - ${name}`}>
      <Container maxWidth="lg">
        <Stack direction="row" gap="60px">
          <TextField placeholder="Search for a collection" sx={{ flex: 2.5 }} />
          <Stack direction="row" gap="15px" sx={{ flex: 1, alignItems: 'center' }}>
            <Typography variant="subtitle1" minWidth="60px">
              Sort by
            </Typography>
            <ButtonPopover
              displayName={sortBy}
              sx={{
                height: '100%',
                width: '100%',
                padding: '15px 18px',
                border: '2px solid',
                borderRadius: '12px',
                ...theme.typography.body1,
                ...theme.palette.textField,
                textTransform: 'none',
                justifyContent: 'flex-start',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                },
                '> .MuiButton-endIcon': {
                  position: 'absolute',
                  right: '15px'
                }
              }}
            >
              {SORT_BY.map((item, index) => (
                <MenuItem
                  key={index}
                  selected={sortBy === SORT_BY[index]}
                  onClick={() => {
                    setSortBy(item);
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </ButtonPopover>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}
