import { Card, Container, Stack } from '@mui/material';
import { getCollectionInfo } from 'clients/crustnft-explore-api/nft-collections';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { MAX_ALLOWED_NFT } from 'constants/cryptopunkConfig';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import DeployStep from './components/DeployStep';
import DistributeStep from './components/DistributeStep';
import UploadStep from './components/UploadStep';

export default function CPProjectDetails() {
  const { id } = useParams();
  const { accessToken, isAuthenticated } = useAuth();
  const { signInWallet } = useWeb3();
  const [error, setError] = useState<boolean>(false);
  const [collectionInfo, setCollectionInfo] = useState<any>();
  const [maxNft, setMaxNft] = useState(0);

  useEffect(() => {
    const getCollection = async () => {
      if (!id) return;
      const _collectionInfo = await getCollectionInfo(accessToken, id);

      if (!_collectionInfo) {
        setError(true);
        return;
      }

      const layers = _collectionInfo.layers;
      let _maxNft = 1;

      for (let i = 0; i < layers.length; i++) {
        const nbImages = layers[i].imageIds.length;
        _maxNft *= nbImages;
      }

      setMaxNft(_maxNft < MAX_ALLOWED_NFT ? _maxNft : MAX_ALLOWED_NFT);
      setCollectionInfo(_collectionInfo);
    };

    getCollection();
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) {
      signInWallet();
    }
  }, [signInWallet]);

  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg" sx={{ mt: { lg: -3 } }}>
        <HeaderBreadcrumbs
          heading="Dashboard"
          headingLink="#/tenK-collection"
          links={[{ name: collectionInfo?.name, href: '#/tenK-collection' }]}
        />

        <Card sx={{ p: 3 }}>
          <Stack spacing={4}>
            <UploadStep id={id || ''} status={collectionInfo?.status || ''} />

            <DeployStep
              maxNft={maxNft}
              txHash={collectionInfo?.txHash || ''}
              metadataCID={collectionInfo?.metadataCID || ''}
            />

            <DistributeStep txHash={collectionInfo?.txHash || ''} />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
