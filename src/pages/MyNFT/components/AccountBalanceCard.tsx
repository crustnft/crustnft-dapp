import { Icon } from '@iconify/react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import { useState } from 'react';
const HEIGHT = 276;

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT
}));

const CardItemStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  backgroundImage:
    'url("https://mewcard.mewapi.io/?address=0xFeCda4613CCf92a39d144cF1917A76326D55Fb29")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10
}));

export default function AccountBalanceCard() {
  const theme = useTheme();
  const [showCurrency, setShowCurrency] = useState(true);

  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };

  return (
    <RootStyle>
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <CardItemStyle>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>
                Token Balance
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ typography: 'h3' }}>
                  {showCurrency ? `\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7` : '12345 RIN'}
                </Typography>
                <IconButton color="inherit" onClick={onToggleShowCurrency} sx={{ opacity: 0.48 }}>
                  <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </Stack>
            </Box>

            <Stack alignItems="flex-end">
              <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>
                NFTs Balance
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ typography: 'h3' }}>0</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
            <Icon icon="carbon:qr-code" width="36" height="36" />
          </Stack>

          <Stack direction="row" spacing={5}>
            <div>
              <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>
                Wallet Address
              </Typography>
              <Typography sx={{ typography: 'subtitle1', textAlign: 'right' }}>
                0x1234234237482749732947237498327
              </Typography>
            </div>
          </Stack>
        </CardItemStyle>
      </Box>
    </RootStyle>
  );
}
