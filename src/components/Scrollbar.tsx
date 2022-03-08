import { BoxProps } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';
import SimpleBarReact, { Props } from 'simplebar-react';
import { Box } from '../components/@c-components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

// ----------------------------------------------------------------------

interface SxRootProps {
  sxRoot?: SxProps;
}
const Scrollbar = ({ children, sx, sxRoot, ...other }: BoxProps & SxRootProps & Props) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle sx={sxRoot}>
      <SimpleBarStyle timeout={500} clickOnTrack={true} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};

export default React.memo(Scrollbar);
