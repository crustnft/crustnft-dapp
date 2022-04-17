import { Container } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect } from 'react';
import Page from '../../components/Page';
import NftForm from './components/NftForm';

export default function MintNft() {
  const { signInWallet, pending } = useWeb3();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, pending]);

  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <NftForm />
      </Container>
    </Page>
  );
}
