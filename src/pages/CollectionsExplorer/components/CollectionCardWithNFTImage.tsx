import { Box, ButtonBase, Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useState } from 'react';
import { getNftList4CollectionCard, NftItem } from 'services/fetchCollection/getNFTList';
import { connectContract, getName, getTotalSupply } from 'services/smartContract/evmCompatible';
import { getRpcUrlByChainId } from 'utils/blockchainHandlers';
import { CollectionData } from './SimpleCollectionCard';

type CollectionCardProps = {
  collection: CollectionData;
};

const CollectionCardWithNFTImage = ({ collection }: CollectionCardProps) => {
  const NB_NFT_TO_SHOW = 4;
  const emptyNftList = new Array(NB_NFT_TO_SHOW).fill(null).map((_, index) => ({
    key: index.toString(),
    failToLoad: false,
    tokenId: '',
    tokenURI: '',
    imageUrl: '',
    name: '',
    owner: '',
    chainName: '',
    contractAddr: ''
  }));
  const [nftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const { contractAddress, chainId } = collection;
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);

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
    getTotalSupply(contract)
      .then((totalSupply) => setTotalSupply(totalSupply))
      .catch((e) => {
        console.log('ee', e, contract.address);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const _nftList = await getNftList4CollectionCard(
        contract,
        chainId,
        totalSupply,
        NB_NFT_TO_SHOW
      );
      if (!_nftList) return;
      setNftList(_nftList);
    };
    fetchData();
  }, [contract, totalSupply]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Stack direction="column" sx={{ width: '90%' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'baseline', justifyContent: 'space-between', py: 1, pb: 2 }}
          >
            <Typography variant="h5" sx={{ maxWidth: '70%' }} noWrap>
              {name}
            </Typography>
            <Typography variant="caption">({totalSupply} NFTs)</Typography>
          </Stack>
          <Stack>
            <Box
              sx={{
                borderRadius: '15px',
                overflow: 'hidden'
              }}
            >
              <Grid container spacing={0.5}>
                {nftList.map((nft, index) => {
                  return (
                    <Grid item xs={6} key={index}>
                      <ButtonBase>
                        <CardMedia
                          component="img"
                          image={
                            nft.imageUrl !== ''
                              ? nft.imageUrl
                              : './static/collection/empty_image.svg'
                          }
                          sx={{
                            aspectRatio: '1.5'
                          }}
                        />
                      </ButtonBase>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default CollectionCardWithNFTImage;
