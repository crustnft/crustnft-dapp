import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Button, Card, IconButton, Stack, Tooltip } from '@mui/material';
import LightboxModal from 'components/LightboxModal';
import { Chain } from 'interfaces/chain';
import { useEffect, useState } from 'react';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
import { AssetAndOwnerType } from '../AssetViewer.types';

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [chain, setChain] = useState<Chain | undefined>(undefined);

  useEffect(() => {
    if (assetAndOwner.chain) {
      const chainObj = getChainByNetworkName(assetAndOwner.chain);
      setChain(chainObj);
    }
  }, [assetAndOwner]);

  const handleOpenLightbox = (url: string) => {
    setOpenLightbox(true);
  };

  return (
    <Card sx={{ overflow: 'visible' }}>
      <Stack sx={{ p: 3, padding: '0px' }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Box
            component="img"
            alt="post media"
            src={assetAndOwner.imageUrl}
            onLoad={() => setLoading(false)}
            sx={{
              display: loading ? 'none' : 'block',
              borderRadius: '15px'
            }}
          />
          {loading ? (
            <></>
          ) : (
            <>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<FullscreenIcon />}
                sx={{
                  position: 'absolute',
                  top: '5px',
                  left: '5px',
                  borderRadius: '15px',
                  opacity: 0.5
                }}
                onClick={() => handleOpenLightbox(assetAndOwner.imageUrl)}
              >
                View Full
              </Button>
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  position: 'absolute',
                  bottom: '-50px',
                  borderRadius: '50px',
                  backgroundColor: 'primary.lighter',
                  backgroundOpacity: 0.5
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Tooltip title="Transaction History">
                    <IconButton
                      href={`${chain?.blockExplorerUrl || ''}/token/${
                        assetAndOwner.contractAddress
                      }?a=${assetAndOwner.tokenId}`}
                      target="_blank"
                    >
                      <Box component="img" src={chain?.icon || ''} sx={{ height: 50 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Opensea Viewer">
                    <IconButton
                      href={`https://testnets.opensea.io/assets/${assetAndOwner.contractAddress}/${assetAndOwner.tokenId}`}
                      target="_blank"
                    >
                      <Box
                        component="img"
                        src="./static/icons/shared/opensea.svg"
                        sx={{ height: 50 }}
                      />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </>
          )}
          <LightboxModal
            images={[assetAndOwner.imageUrl]}
            mainSrc={assetAndOwner.imageUrl}
            photoIndex={0}
            setPhotoIndex={() => {}}
            isOpen={openLightbox}
            onCloseRequest={() => setOpenLightbox(false)}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
        >
          <LineScalePulseOutRapid color={'#637381'} loading={loading} />
        </Stack>
      </Stack>
    </Card>
  );
}
