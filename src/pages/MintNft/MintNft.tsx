import { Container } from '../../components/@c-components';
import Page from '../../components/Page';
import NftForm from './components/NftForm';

export default function MintNft() {
  return (
    <Page title="Mint your NFT">
      <Container maxWidth={'lg'}>
        <NftForm />
      </Container>
    </Page>
  );
}
