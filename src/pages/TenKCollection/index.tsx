import { Container, Box, Tabs, Tab, Button } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import Page from '../../components/Page';
import General from './components/General';
import Media from './components/Media';
import Deployment from './components/Deployment';
import Distribution from './components/Distribution';
import { FormProvider } from '../../components/hook-form';
import { useForm } from 'react-hook-form';

const TabsList = [
  {
    label: 'General'
  },
  {
    label: 'Media'
  },
  {
    label: 'Deployment'
  },
  {
    label: 'Distribution'
  }
];

const TenKCollection: React.FC = () => {
  const [value, setValue] = useState(0);
  const formContext = useForm();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    //
  };

  return (
    <Page title="10K Collection">
      <Container maxWidth="lg">
        <h2>Create item for collection</h2>
        <FormProvider onSubmit={handleSubmit} methods={formContext}>
          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="TenK collection information">
                {TabsList.map((tab, index) => (
                  <Tab label={tab.label} {...a11yProps(index)} key={index} />
                ))}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <General />
              <Button variant="contained" size="large" onClick={() => setValue(1)}>
                Next
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Media />
              <Button variant="contained" color="inherit" size="large" onClick={() => setValue(0)}>
                Back
              </Button>
              <Button variant="contained" size="large" sx={{ ml: 1 }} onClick={() => setValue(2)}>
                Next
              </Button>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Deployment />
              <Button variant="contained" size="large" color="inherit" onClick={() => setValue(1)}>
                Back
              </Button>
              <Button variant="contained" size="large" sx={{ ml: 1 }}>
                Generate
              </Button>
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{ ml: 1 }}
                onClick={() => setValue(3)}
              >
                Deploy
              </Button>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Distribution />
              <Button variant="contained" size="large">
                Mint
              </Button>
            </TabPanel>
          </div>
        </FormProvider>
      </Container>
    </Page>
  );
};

function a11yProps(index: number) {
  return {
    id: `10k-collection-tab-${index}`,
    'aria-controls': `10k-collection-tabpanel-${index}`
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`10k-collection-tabpanel-${index}`}
      aria-labelledby={`10k-collection-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default TenKCollection;
