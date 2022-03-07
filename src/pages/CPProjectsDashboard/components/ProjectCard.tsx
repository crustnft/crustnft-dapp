import { Box, Button, Card, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import Iconify from 'components/Iconify';
import MenuPopover from 'components/MenuPopover';
import { useRef, useState } from 'react';

export default function ProjectCard() {
  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <Box sx={{ backgroundColor: '#F4F6F8', px: 2, py: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column">
            <Typography variant="caption">Created on 28/02/2022 - 18h33</Typography>
            <Typography variant="subtitle2">Name projects</Typography>
          </Stack>
          <IconButton
            size="small"
            ref={popoverRef}
            onClick={handleOpen}
            color={open ? 'inherit' : 'default'}
          >
            <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={popoverRef.current}
          sx={{ width: 220 }}
        >
          <MenuItem sx={{ color: 'error.main' }}>
            <Iconify
              icon={'eva:trash-2-outline'}
              sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }}
            />
            Delete Project
          </MenuItem>

          <MenuItem>
            <Iconify icon={'eva:edit-fill'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
            Something else
          </MenuItem>
        </MenuPopover>
      </Box>

      <Divider />
      <Stack sx={{ px: 2, py: 1 }} spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" noWrap>
            Uploaded Photos
          </Typography>
          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            20
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" noWrap>
            Max NFTs
          </Typography>
          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            2000
          </Typography>
        </Stack>
        <Stack>
          <Button variant="outlined" size="small">
            Open
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}