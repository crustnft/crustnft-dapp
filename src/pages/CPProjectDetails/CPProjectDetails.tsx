import { Icon } from '@iconify/react';
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { getCollectionInfo } from 'clients/crustnft-explore-api/nft-collections';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { MAX_ALLOWED_NFT } from 'constants/cryptopunkConfig';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import DeployStep from './components/DeployStep';
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

            <Stack>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                3. NFTs Distribution
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Connect with trading platform and start selling your NFTs
              </Typography>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      p: 3,
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'background.neutral',
                        border: '1px solid #15B2E5'
                      }
                    }}
                  >
                    <Stack
                      spacing={2}
                      alignItems="center"
                      direction={{ xs: 'column', md: 'row' }}
                      sx={{
                        width: 1,
                        textAlign: { xs: 'center', md: 'left' }
                      }}
                    >
                      <Icon icon="ci:share-outline" height="40" color="#637381" />

                      <Box>
                        <Typography gutterBottom variant="h5">
                          Distribute NFTs
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Distribute NFTs to your users
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
