import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';

export default function MintCPNft() {
  const { chain, contractAddr } = useParams();
  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        {chain} {contractAddr}
      </Container>
    </Page>
  );
}
