import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Tab, Typography } from '@mui/material';
import { CrustButton, CrustOptionBox } from 'components/crust';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { pxToRem } from 'utils/getFontValue';
export default function ExpandableCollection() {
  const { tab: tabFromRoute } = useParams<'tab'>();
  const [tab, setTab] = useState<string>(tabFromRoute?.toLowerCase() || 'general');
  const { chain: selectedChain } = useWallet();
  const location = useLocation();
  const { switchNetwork } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (tabFromRoute !== tab) {
      navigate('/create-collection/expandable/' + tab);
    }
  }, [tabFromRoute, tab, location, navigate]);

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
              <Tab label="General" value="general" />
              <Tab label="Create" value="create" />
            </TabList>
          </Box>
          <TabPanel value="general" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid container xs={12} sm={8}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5" sx={{ margin: '25px 0' }}>
                    Choose a network
                  </Typography>
                </Grid>
                <Grid container xs={12} style={{ margin: '-12.5px -15px' }}>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
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
                      setTab('create');
                    }}
                  >
                    Next
                  </CrustButton>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="create" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid item xs={8}>
                <Typography variant="h5">Upload file</Typography>
                {/* <Upload */}
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
