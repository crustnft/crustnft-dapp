// material
import { Grid, Stack } from '@mui/material';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../AssetViewer.types';
import AssetAttributes from './AssetAttributes';
import AssetCard from './AssetCard';
//
import AssetDetails from './AssetDetails';
import MoreFromThisCollection from './MoreFromThisCollection';

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Stack spacing={5}>
          <AssetCard assetAndOwner={assetAndOwner} />
          <AssetDetails assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={7}>
        <Stack spacing={3}>
          <AssetAttributes assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MoreFromThisCollection assetAndOwner={assetAndOwner} />
      </Grid>
    </Grid>
  );
}
