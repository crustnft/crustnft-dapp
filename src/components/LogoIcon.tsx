import { Box, BoxProps } from '@mui/material';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';

export default function Logo({ sx }: BoxProps) {
  const { themeMode } = useSettings();

  const [logoUrl, setLogoUrl] = useState('./static/logo/v1/long-logo-black.png');

  useEffect(() => {
    if (themeMode === 'dark') {
      setLogoUrl('./static/logo/v1/icon-black.png');
    } else {
      setLogoUrl('./static/logo/v1/icon-black.png');
    }
  }, [themeMode]);

  return <Box sx={{ height: 24, ...sx }} component="img" src={logoUrl} />;
}
