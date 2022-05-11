import { Stack } from '@mui/material';
import CrustLabel from './CrustLabel';
const CrustLabelStories = {
  title: 'CrustLabel',
  component: CrustLabel
};
export default CrustLabelStories;
export const Default = () => (
  <Stack>
    <CrustLabel>A label</CrustLabel>
    <CrustLabel helpText="This is help text for a label">A label with help text</CrustLabel>
  </Stack>
);
