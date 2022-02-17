import { Box, Card, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import Page from '../../components/Page';
import MyCollections from './components/MyCollections';
import ProfileCover from './components/ProfileCover';

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
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover />
          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              <Tab disableRipple key="nfts-tab" value="nfts" label="NFTs" />
              <Tab
                disableRipple
                key="activity-tab"
                value="activity"
                label={capitalCase('activity')}
              />
            </Tabs>
          </TabsWrapperStyle>
        </Card>
        {currentTab === 'nfts' && (
          <Box key="nfts">
            <MyCollections />
          </Box>
        )}
        {currentTab === 'activity' && <Box key="activity">Hello</Box>}
      </Container>
    </Page>
  );
}
