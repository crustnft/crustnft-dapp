import { ButtonBase, Card, Divider, Stack, Typography, useTheme } from '@mui/material';
import Iconify from 'components/Iconify';
import { Chain } from 'interfaces/chain';
import { useEffect, useState } from 'react';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
import { shortenAddress } from 'utils/formatAddress';
import useLocales from '../../../hooks/useLocales';
import { AssetAndOwnerType } from '../AssetViewer.types';

export default function AssetDetails({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const { translate } = useLocales();
  const theme = useTheme();
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  useEffect(() => {
    if (assetAndOwner.chain) {
      const chainObj = getChainByNetworkName(assetAndOwner.chain);
      setChain(chainObj);
    }
  }, [assetAndOwner]);

  return (
    <Card>
      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="akar-icons:image" />
          <Typography variant="subtitle1">Details</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate(`assetDetail.contract`)}
          </Typography>
          <ButtonBase>
            <Typography
              variant="body2"
              color={theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'}
            >
              {shortenAddress(assetAndOwner.contractAddress, 5)}
            </Typography>
          </ButtonBase>
        </Stack>
        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate(`assetDetail.id`)}
          </Typography>
          <ButtonBase>
            <Typography
              variant="body2"
              color={theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'}
            >
              {assetAndOwner.tokenId}
            </Typography>
          </ButtonBase>
        </Stack>
        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate(`assetDetail.standard`)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ERC721
          </Typography>
        </Stack>
        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translate(`assetDetail.network`)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {chain?.name || ''}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
