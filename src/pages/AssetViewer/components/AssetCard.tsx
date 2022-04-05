import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Button, Card, IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import LightboxModal from 'components/LightboxModal';
import { openseaUrlDictionary } from 'constants/openseaChainUrl';
import { Chain } from 'interfaces/chain';
import { useEffect, useState } from 'react';
import { getChainByNetworkName } from 'utils/blockchainHandlers';
import { AssetAndOwnerType } from '../AssetViewer.types';

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  const [openseaLinkPrefix, setOpenseaLinkPreFix] = useState<string>('');

  useEffect(() => {
    if (assetAndOwner.chain) {
      const chainObj = getChainByNetworkName(assetAndOwner.chain);
      setChain(chainObj);
      if (!chainObj) return;
      const openseaLinkPrefix = openseaUrlDictionary.get(chainObj?.name.toLowerCase());
      if (openseaLinkPrefix && openseaLinkPrefix !== '') {
        setOpenseaLinkPreFix(openseaLinkPrefix);
      }
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
              borderRadius: '15px',
              width: '100%'
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
                  bottom: '-40px',
                  borderRadius: '50px',
                  backgroundColor: 'header.background',
                  backgroundOpacity: 0.5
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Transaction History">
                    <IconButton
                      href={`${chain?.blockExplorerUrl || ''}/token/${
                        assetAndOwner.contractAddress
                      }?a=${assetAndOwner.tokenId}`}
                      target="_blank"
                    >
                      <Box component="img" src={chain?.icon || ''} sx={{ height: 30, width: 30 }} />
                    </IconButton>
                  </Tooltip>
                  {openseaLinkPrefix !== '' ? (
                    <Tooltip title="Opensea Viewer">
                      <IconButton
                        href={`${openseaLinkPrefix}/${assetAndOwner.contractAddress}/${assetAndOwner.tokenId}`}
                        target="_blank"
                      >
                        <Box
                          component="img"
                          src="./static/icons/shared/opensea.svg"
                          sx={{ height: 30 }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
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
        <Card sx={{ width: '100%', display: loading ? 'flex' : 'none', aspectRatio: '1 / 1' }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Card>
      </Stack>
    </Card>
  );
}
