import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, styled, Tab, Typography } from '@mui/material';
import { CrustButton } from 'components/crust';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useCallback, useState } from 'react';
import { pxToRem } from 'utils/getFontValue';

const CrustOptionBox = styled(Box)(({ theme }) => ({
  border: `solid 2px ${theme.palette.grey[300]}`,
  borderRadius: pxToRem(12),
  padding: pxToRem(19),
  textAlign: 'center',
  '> *': {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  '&.Mui-selected': {
    borderColor: theme.colors?.accent.main || theme.palette.secondary.main,
    backgroundColor: theme.colors?.accent.lighter || theme.palette.secondary.lighter
  }
}));
export default function ExpandableCollection() {
  const [tab, setTab] = useState<string>('General');
  const { chain: selectedChain } = useWallet();
  const { switchNetwork } = useWeb3();

  const onTabChange = useCallback(
    (_e, v) => {
      setTab(v);
    },
    [setTab]
  );
  return (
    <Container fixed>
      <Typography variant="h3" component="h3" gutterBottom>
        Create multiple
      </Typography>
      <Box>
        <TabContext value={tab}>
          <Box>
            <TabList onChange={onTabChange} aria-label="basic tabs example">
              <Tab label="General" value="General" />
              <Tab label="Create" value="Create" />
            </TabList>
          </Box>
          <TabPanel value="General" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid container xs={8}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5" sx={{ margin: '25px 0' }}>
                    Choose a network
                  </Typography>
                </Grid>
                <Grid container xs={12} style={{ margin: '-12.5px -15px' }}>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <Grid
                      item
                      xs={6}
                      key={chain.chainId}
                      style={{
                        padding: '12.5px 15px'
                      }}
                    >
                      <CrustOptionBox
                        className={
                          chain.chainId === selectedChain.chainId ? 'Mui-selected' : undefined
                        }
                        onClick={() => {
                          switchNetwork(chain.chainId);
                        }}
                      >
                        <div
                          style={{
                            marginRight: pxToRem(15),
                            width: pxToRem(42),
                            height: pxToRem(42)
                          }}
                        >
                          <chain.Icon />
                        </div>
                        <Typography variant="subtitle1">{chain.name}</Typography>
                      </CrustOptionBox>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '32px' }}>
                  <CrustButton
                    variant="contained"
                    onClick={() => {
                      setTab('Create');
                    }}
                  >
                    Next
                  </CrustButton>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="Create" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid item xs={8}>
                Item Two
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
