import { Container, Grid } from '@mui/material';
import { getContracts } from 'clients/crustnft-explore-api';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import CollectionCardWithNFTImage from './components/CollectionCardWithNFTImage';
import SkeletonCollectionCard from './components/SkeletonCollectionCard';

export default function CollectionsExplorer() {
  const [collections, setCollections] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      getContracts(50).then((res) => {
        setCollections(res?.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const skeletonLoading = () => {
    const nbCards = Array.from(Array(9).keys());
    return nbCards.map((n, index) => (
      <Grid key={`${n}-${index}`} item xs={12} sm={6} md={4}>
        <SkeletonCollectionCard />
      </Grid>
    ));
  };

  const collectionsLoaded = () => {
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
          {loading ? skeletonLoading() : collectionsLoaded()}
        </Grid>
      </Container>
    </Page>
  );
}
