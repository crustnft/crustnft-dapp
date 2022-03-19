import { Container, Grid } from '@mui/material';
import { getContracts } from 'clients/crustnft-explore-api';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import CollectionCardWithNFTImage from './components/CollectionCardWithNFTImage';

export default function CollectionsExplorer() {
  const [collections, setCollections] = useState<any>([]);
  useEffect(() => {
    try {
      getContracts(50).then((res) => {
        setCollections(res?.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const Collections = () => {
    return collections.map((collection: any) => (
      <Grid key={collection.contractAddress} item xs={12} sm={6} md={4}>
        <CollectionCardWithNFTImage collection={collection} />
      </Grid>
    ));
  };

  useEffect(() => {
    console.log(collections);
  }, [collections]);

  return (
    <Page title="Collection Explore">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Collections />
        </Grid>
      </Container>
    </Page>
  );
}
