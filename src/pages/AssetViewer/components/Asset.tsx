// material
import { Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CollectionSlider from 'pages/MyNFT/components/CollectionSlider';
import { useEffect, useState } from 'react';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../AssetViewer.types';
import AssetAttributes from './AssetAttributes';
import AssetCard from './AssetCard';
//
import AssetDetails from './AssetDetails';

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const [chainID, setChainID] = useState(-1);
  useEffect(() => {
    if (assetAndOwner.chain) {
      setChainID(getChainByNetworkName(assetAndOwner.chain)?.chainId as number);
    }
  }, [assetAndOwner]);

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

      {chainID !== -1 ? (
        <Grid item xs={12}>
          <Stack spacing={3}>
            <CollectionSlider contractAddr={assetAndOwner.contractAddress} chainId={chainID} />
          </Stack>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
