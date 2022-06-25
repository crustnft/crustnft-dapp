import { Box, Button, MenuItem, MenuList } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ArrowDownSquare } from 'assets/icons';
import MenuPopover from 'components/MenuPopover';
import { useRef, useState } from 'react';

interface StatSectionMenuProps {
  menuItems: string[];
}

const StatSectionMenu = ({ menuItems }: StatSectionMenuProps) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <>
      <Box
        component={Button}
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color="text.primary"
        endIcon={<ArrowDownSquare />}
        sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}
      >
        {menuItems[selectedItem]}
      </Box>
      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{
          mt: 0,
          width: 'none'
        }}
      >
        <MenuList
          onClick={() => {
            setOpen(false);
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              selected={selectedItem === index}
              onClick={() => setSelectedItem(index)}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}
              >
                {item}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </>
  );
};

export default StatSectionMenu;
