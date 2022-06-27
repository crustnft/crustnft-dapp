import { Box, Button, SxProps } from '@mui/material';
import { ArrowDownSquare } from 'assets/icons';
import { useRef, useState } from 'react';
import MenuPopover from './MenuPopover';
import Scrollbar from './Scrollbar';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  displayName: string;
  menuHeader?: string | JSX.Element;
  sx?: SxProps;
}

const ButtonPopover = ({ displayName, menuHeader, children, ...other }: ButtonProps) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        component={Button}
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color="text.primary"
        size="small"
        marginTop={{ xs: 2, sm: 0 }}
        marginLeft={{ sm: 2 }}
        endIcon={<ArrowDownSquare />}
        {...other}
      >
        {displayName}
      </Box>
      <MenuPopover
        open={open}
        onClick={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{ mt: 0 }}
      >
        <Box sx={{ mt: '10px' }}>{menuHeader}</Box>
        <Scrollbar sx={{ pb: 1 }}>{children}</Scrollbar>
      </MenuPopover>
    </>
  );
};

export default ButtonPopover;
