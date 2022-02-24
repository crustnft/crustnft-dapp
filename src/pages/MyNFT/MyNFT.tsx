import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Page from '../../components/Page';
import AccountBalanceCard from './components/AccountBalanceCard';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';
const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

export default function MyNFT() {
  const [currentTab, setCurrentTab] = useState('nfts');

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={7}>
            <CallAction />
          </Grid>
          <Grid item xs={5}>
            <AccountBalanceCard />
          </Grid>
        </Grid>
        <Box key="nfts">
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}
