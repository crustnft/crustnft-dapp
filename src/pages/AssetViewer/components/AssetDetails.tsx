import { Chain } from 'interfaces/chain';
import { useEffect, useState } from 'react';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
import { shortenAddress } from 'utils/formatAddress';
import {
  Box,
  ButtonBase,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '../../../components/@c-components';
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
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Tooltip title="Transaction History">
          <IconButton
            href={`${chain?.blockExplorerUrl || ''}/token/${assetAndOwner.contractAddress}?a=${
              assetAndOwner.tokenId
            }`}
            target="_blank"
          >
            <Box component="img" src={chain?.icon || ''} sx={{ height: 24 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Opensea Viewer">
          <IconButton
            href={`https://testnets.opensea.io/assets/${assetAndOwner.contractAddress}/${assetAndOwner.tokenId}`}
            target="_blank"
          >
            <Box component="img" src="./static/icons/shared/opensea.svg" sx={{ height: 24 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
