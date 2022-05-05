import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, styled, Tab, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

const CrustTab = styled(Tab)(({ theme }) => ({
  padding: 0,
  marginRight: 35,
  alignItems: 'flex-start',
  textTransform: 'capitalize',
  ...theme.typography.h6,
  height: theme.typography.h6.lineHeight,
  minWidth: 'auto',
  color: theme.palette.grey[500],
  '&.Mui-selected': {
    color: theme.palette.grey[700]
  }
}));
export default function ExpandableCollection() {
  const [tab, setTab] = useState<string>('General');
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
              <CrustTab label="General" value="General" />
              <CrustTab label="Create" value="Create" />
            </TabList>
          </Box>
          <TabPanel value="General" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid container xs={8}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5" gutterBottom>
                    Choose a network
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box>s</Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>s</Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>s</Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>s</Box>
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
