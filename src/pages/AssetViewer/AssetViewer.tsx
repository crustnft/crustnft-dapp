import Identicons from '@nimiq/identicons';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataFromTokenUri } from 'services/http';
import { connectContract, getOwner, getTokenURI } from 'services/smartContract/evmCompatible';
import { getRpcUrlByNetworkName } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import { Box, Container } from '../../components/@c-components';
import Page from '../../components/Page';
import type { AssetAndOwnerType } from './AssetViewer.types';
import { Asset } from './components';

Identicons.svgPath = './static/identicons.min.svg';

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
  }, []);

  return (
    <Page title={`Asset Viewer - ${assetAndOwner.name}`}>
      <Container maxWidth="lg">
        <Box>
          <Asset assetAndOwner={assetAndOwner} />
        </Box>
      </Container>
    </Page>
  );
}
