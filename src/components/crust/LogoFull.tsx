import { Box, BoxProps } from '@mui/material';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';

export default function LogoFull({ sx }: BoxProps) {
  const { themeMode } = useSettings();

  const [logoUrl, setLogoUrl] = useState('./static/logo/v1/long-logo-black.png');

  useEffect(() => {
    if (themeMode === 'dark') {
      setLogoUrl('./static/logo/v1/long-logo-white.png');
    } else {
      setLogoUrl('./static/logo/v1/long-logo-black.png');
    }
  }, [themeMode]);

  return <Box sx={{ height: 20, ...sx }} component="img" src={logoUrl} />;
}
