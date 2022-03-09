import { getContracts } from 'clients/crustnft-explore-api';
import { useEffect, useState } from 'react';
import { Container, Grid } from '../../components/@c-components';
import Page from '../../components/Page';
import SimpleCollectionCard from './components/SimpleCollectionCard';
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
        <SimpleCollectionCard collection={collection} />
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
