import { Container, Grid } from '@mui/material';
import { getContracts } from 'clients/crustnft-explore-api';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import SimpleCollectionCard from './components/SimpleCollectionCard';

export default function MyNFT() {
  const [collections, setCollections] = useState<any>([]);
  useEffect(() => {
    getContracts(50)
      .then((res) => {
        setCollections(res?.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {collections.map((collection: any) => (
            <Grid key={collection.contractAddress} item xs={12} sm={6} md={4}>
              <SimpleCollectionCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
