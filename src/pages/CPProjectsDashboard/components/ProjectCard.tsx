import { Box, Button, Card, Divider, Link, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { TProject } from '../CPProjectsDashboard.type';

type ProjectCardProps = { project: TProject };

export default function ProjectCard({ project }: ProjectCardProps) {
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
      <Box sx={{ backgroundColor: 'customBackground.cpCardHeader', px: 2, py: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column">
            <Typography variant="caption">
              Created at {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
            </Typography>
            <Typography variant="subtitle2">{project.name}</Typography>
          </Stack>
          {/* <IconButton
            size="small"
            ref={popoverRef}
            onClick={handleOpen}
            color={open ? 'inherit' : 'default'}
          >
            <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
          </IconButton> */}
        </Stack>

        {/* <MenuPopover
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
        </MenuPopover> */}
      </Box>

      <Divider />
      <Stack sx={{ px: 2, py: 1 }} spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" noWrap>
            Uploaded Photos
          </Typography>
          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            {project?.images?.length || 0}
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
          <Link href={`#/collection-details/${project.id}`} sx={{ width: '100%' }}>
            <Button fullWidth variant="outlined" size="small">
              Open
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
