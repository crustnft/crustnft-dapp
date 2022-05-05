import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useCallback, useState } from 'react';

export default function ExpandableCollection() {
  const [tab, setTab] = useState<string>('General');
  const onTabChange = useCallback(
    (v) => {
      setTab(v);
    },
    [setTab]
  );
  return (
    <div>
      <h3>Create multiple</h3>
      <Tabs value={tab} onChange={onTabChange} aria-label="basic tabs example">
        <Tab label="General" />
        <Tab label="Create" />
      </Tabs>
      <TabPanel value="General">Item One</TabPanel>
      <TabPanel value="Create">Item Two</TabPanel>
    </div>
  );
}
