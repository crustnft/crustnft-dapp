import { Stack } from '@mui/material';
import CrustOptionBox from './CrustOptionBox';
const CrustOptionBoxStories = {
  title: 'CrustOptionBox',
  component: CrustOptionBox
};
export default CrustOptionBoxStories;

export const Default = () => (
  <Stack direction="row" spacing={2}>
    <CrustOptionBox>A Box</CrustOptionBox>
    <CrustOptionBox selected>A selected box</CrustOptionBox>
  </Stack>
);
