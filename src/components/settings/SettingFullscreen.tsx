import roundFullscreen from '@iconify/icons-ic/round-fullscreen';
import roundFullscreenExit from '@iconify/icons-ic/round-fullscreen-exit';
import { Icon } from '@iconify/react';
// material
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { Button } from '../@c-components';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? 'primary' : 'inherit'}
      startIcon={<Icon icon={fullscreen ? roundFullscreenExit : roundFullscreen} />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(fullscreen && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        })
      }}
    >
      {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  );
}
