import { Stack } from '@mui/material';
import ThemeProvider from 'theme';
import CrustButton from './CrustButton';
const CrustButtonStories = {
  title: 'CrustButton',
  component: CrustButton
};
export default CrustButtonStories;

export const Variants = () => (
  <ThemeProvider theme="crust">
    <Stack direction="row" spacing={2}>
      <CrustButton color="primary" variant="contained">
        Contained
      </CrustButton>
      <CrustButton color="primary" variant="outlined">
        Outlined
      </CrustButton>
      <CrustButton color="primary" variant="fab">
        fab
      </CrustButton>
    </Stack>
  </ThemeProvider>
);
export const Colors = () => (
  <ThemeProvider theme="crust">
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
  </ThemeProvider>
);
