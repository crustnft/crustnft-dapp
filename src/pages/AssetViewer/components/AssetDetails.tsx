import { ButtonBase, Card, CardHeader, Stack, Typography } from '@mui/material';
import { Chain } from 'interfaces/chain';
import { useEffect, useState } from 'react';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
import { shortenAddress } from 'utils/formatAddress';
import useLocales from '../../../hooks/useLocales';
import { AssetAndOwnerType } from '../AssetViewer.types';
export default function AssetDetails({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const { translate } = useLocales();
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  useEffect(() => {
    if (assetAndOwner.chain) {
      const chainObj = getChainByNetworkName(assetAndOwner.chain);
      setChain(chainObj);
    }
  }, [assetAndOwner]);

  return (
    <Card>
      <CardHeader title="Asset Details" />

      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.contract`)}</Typography>
          <ButtonBase>
            <Typography variant="body2">
              {shortenAddress(assetAndOwner.contractAddress, 5)}
            </Typography>
          </ButtonBase>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.id`)}</Typography>
          <ButtonBase>
            <Typography variant="body2">{assetAndOwner.tokenId}</Typography>
          </ButtonBase>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.standard`)}</Typography>
          <Typography variant="body2">ERC721</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{translate(`assetDetail.network`)}</Typography>
          <Typography variant="body2">{chain?.name || ''}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
