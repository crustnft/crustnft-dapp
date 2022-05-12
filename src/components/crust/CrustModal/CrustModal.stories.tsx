import { Stack, Typography } from '@mui/material';
import CrustButton from '../CrustButton';
import CrustModal from './CrustModal';
const CrustModalStories = {
  title: 'CrustModal',
  component: CrustModal
};
export default CrustModalStories;
export const Default = () => (
  <Stack>
    <CrustModal
      title="Add properties"
      button={<CrustButton>Open modal</CrustButton>}
      actions={
        <CrustButton variant="contained" size="large" color="primary">
          Save
        </CrustButton>
      }
    >
      <Typography>Your subtitle is here. Feel free to change it</Typography>
    </CrustModal>
  </Stack>
);
