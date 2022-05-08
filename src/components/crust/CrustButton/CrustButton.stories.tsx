import { Stack } from '@mui/material';
import CrustButton from './CrustButton';
const CrustButtonStories = {
  title: 'CrustButton',
  component: CrustButton
};
export default CrustButtonStories;

export const Variants = () => (
  <Stack direction="row" spacing={2}>
    <CrustButton color="primary" variant="contained" size="medium">
      Contained
    </CrustButton>
    <CrustButton color="primary" variant="outlined" size="medium">
      Outlined
    </CrustButton>
    <CrustButton color="primary" variant="fab" size="medium">
      fab
    </CrustButton>
  </Stack>
);
export const Colors = () => (
  <Stack direction="row" spacing={2}>
    <CrustButton color="default" variant="outlined">
      Default color
    </CrustButton>
    <CrustButton color="primary" variant="outlined">
      Primary color
    </CrustButton>
    <CrustButton color="secondary" variant="outlined">
      Secondary color
    </CrustButton>
  </Stack>
);
