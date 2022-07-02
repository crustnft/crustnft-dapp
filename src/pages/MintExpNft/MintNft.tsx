import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Tab, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import NetworkSelection from './components/NetworkSelection';
import NftForm from './components/NftForm';

export const MintContext = createContext<{
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}>({ tab: '', setTab: () => {} });

export default function MintNft() {
  const { signInWallet, pending } = useWeb3();
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState('General');
  const { chain, contractAddr } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, pending]);

  useEffect(() => {
    if (chain && contractAddr) {
      setTab('Create');
    }
  }, []);

  return (
    <MintContext.Provider value={{ tab, setTab }}>
      <Page title="Mint your NFT">
        <Container maxWidth={'lg'}>
          <Typography variant="h3" color="text.header">
            Create multiple
          </Typography>
          <TabContext value={tab}>
            <TabList sx={{ mt: '20px', mb: '25px' }} onChange={handleChange}>
              <Tab label="General" value="General" />
              <Tab label="Create" value="Create" />
            </TabList>
            <TabPanel value="General">
              <NetworkSelection networkChoice={chain} />
            </TabPanel>
            <TabPanel value="Create">
              <NftForm defaultContractAddr={contractAddr} />
            </TabPanel>
          </TabContext>
        </Container>
      </Page>
    </MintContext.Provider>
  );
}
