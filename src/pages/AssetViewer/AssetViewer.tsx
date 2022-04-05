import { Container, Grid, Stack } from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataFromTokenUri } from 'services/http';
import { connectContract, getOwner, getTokenURI } from 'services/smartContract/evmCompatible';
import { getRpcUrlByNetworkName } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import Page from '../../components/Page';
import type { AssetAndOwnerType } from './AssetViewer.types';
import AssetAttributes from './components/AssetAttributes';
import AssetCard from './components/AssetCard';
import AssetDetails from './components/AssetDetails';
import MoreFromThisCollection from './components/MoreFromThisCollection';
const initAssetAndOwner: AssetAndOwnerType = {
  tokenId: '',
  name: '',
  description: '',
  imageUrl: '',
  ownerAddress: '',
  contractAddress: '',
  externalUrl: '',
  attributes: [],
  chain: '',

  ownerIcon: '',
  contentId: '',
  nftCardId: '',
  metadataId: ''
};

export default function AssetViewer() {
  const { chain, contractAddr, tokenId } = useParams();

  const contract = useMemo(() => {
    return connectContract(
      contractAddr || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByNetworkName(chain || '')
    );
  }, [contractAddr, chain]);

  const [assetAndOwner, setAssetAndOwner] = useState<AssetAndOwnerType>(initAssetAndOwner);

  useEffect(() => {
    async function fetchData() {
      if (!tokenId) return;

      getTokenURI(contract, parseInt(tokenId)).then(async (tokenUri) => {
        const parsedTokenUri = parseNftUri(tokenUri);
        const data = await getDataFromTokenUri(parsedTokenUri);
        const ownerAddress = await getOwner(contract, parseInt(tokenId));
        const parsedImageUrl = parseNftUri(data.image || '');
        console.log(data);
        setAssetAndOwner((prevState) => ({
          ...prevState,
          imageUrl: parsedImageUrl,
          ownerAddress,
          externalUrl: data?.external_url || '',
          attributes: data?.attributes || [],
          name: data?.name || '',
          description: data?.description || '',
          contractAddress: contractAddr || '',
          tokenId: tokenId || '',
          chain: chain || ''
        }));
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  return (
    <Page title={`Asset Viewer - ${assetAndOwner.name}`}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Stack spacing={5}>
              <AssetCard assetAndOwner={assetAndOwner} />
              <AssetDetails assetAndOwner={assetAndOwner} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <AssetAttributes assetAndOwner={assetAndOwner} />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <MoreFromThisCollection assetAndOwner={assetAndOwner} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
