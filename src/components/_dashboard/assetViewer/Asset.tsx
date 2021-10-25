// material
import { Grid, Stack } from '@mui/material';
//
import AssetDetails from './AssetDetails';
import AssetCard from './AssetCard';
import AboutOwner from './AboutOwner';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../../../pages/AssetViewer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// ----------------------------------------------------------------------

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const biggerThanMd = useMediaQuery(theme.breakpoints.up('md'));

  console.log(biggerThanMd);

  return (
    <Grid container spacing={3} direction={biggerThanMd ? 'row' : 'column-reverse'}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <AboutOwner assetAndOwner={assetAndOwner} />
          <AssetDetails assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <AssetCard assetAndOwner={assetAndOwner} />
      </Grid>
    </Grid>
  );
}
