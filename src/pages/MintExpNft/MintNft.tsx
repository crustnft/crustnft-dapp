import { Container, Tab, Tabs, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';

export default function MintNft() {
  const { signInWallet, pending } = useWeb3();
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState('General');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, pending]);

  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <Typography variant="h3" color="text.header">
          Create multiple
        </Typography>
        <Tabs value={tab} sx={{ mt: '20px' }} onChange={handleChange}>
          <Tab label="General" value="General" />
          <Tab label="Create" value="Create" />
        </Tabs>
        {/* <NftForm /> */}
      </Container>
    </Page>
  );
}
