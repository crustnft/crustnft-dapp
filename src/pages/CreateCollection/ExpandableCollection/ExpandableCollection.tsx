import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Tab, Typography } from '@mui/material';
import { CrustButton, CrustFieldset, CrustOptionBox } from 'components/crust';
import CrustInput from 'components/crust/CrustInput';
import CrustUpload from 'components/crust/CrustUpload';
import { FormProvider } from 'components/hook-form';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { pxToRem } from 'utils/getFontValue';
import LevelsField from './LevelsField';
import PropertiesField from './PropertiesField';
import StatsField from './StatsField';
import BoostsField from './BoostsField';
import { CollectionFormType } from './types';
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
  const createMultipleForm = useForm<CollectionFormType>();
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
              <Grid item xs={12} sm={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h5" sx={{ margin: '25px 0' }}>
                      Choose a network
                    </Typography>
                  </Grid>
                  <Grid container style={{ margin: '-12.5px -15px' }}>
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
                      sx={{ paddingLeft: pxToRem(74.5), paddingRight: pxToRem(74.5) }}
                    >
                      Next
                    </CrustButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="create" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid item xs={8}>
                <FormProvider methods={createMultipleForm}>
                  <CrustFieldset label="Upload file">
                    <CrustUpload name="file" rule="PNG, JPEG or GIF. Max 3GB" />
                  </CrustFieldset>
                  <CrustFieldset label="Item details">
                    <CrustInput
                      label="Item name"
                      name="name"
                      placeholder={`e. g. "Redeemable Bitcoin Card with logo"`}
                    />
                    <CrustInput
                      label="Description"
                      name="name"
                      placeholder={`e. g. "Redeemable Bitcoin Card with logo"`}
                    />
                    <PropertiesField form={createMultipleForm} />
                    <LevelsField form={createMultipleForm} />
                    <StatsField form={createMultipleForm} />
                    <BoostsField form={createMultipleForm} />
                  </CrustFieldset>
                </FormProvider>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
