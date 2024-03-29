// @mui
import { IconButton, MenuItem, OutlinedInput, Stack } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

type Props = {
  layerName: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function ImagesLayerToolBar({ layerName, onDelete, onUpdate }: Props) {
  const renameRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(layerName);

  const [open, setOpen] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickRename = () => {
    handleClose();
  };

  const handleChangeLayerName = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyUpLayer = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && renameRef.current) {
      renameRef.current.blur();
    }
  };

  const handleUpdateLayer = () => {
    onUpdate(value);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <OutlinedInput
          size="small"
          placeholder="Layer Name"
          value={value}
          onBlur={handleUpdateLayer}
          onChange={handleChangeLayerName}
          onKeyUp={handleKeyUpLayer}
          inputRef={renameRef}
          sx={{
            typography: 'h6',
            minWidth: '280px',
            fontWeight: 'fontWeightBold',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent'
            }
          }}
        />

        <IconButton size="small" onClick={handleOpen} color={open ? 'inherit' : 'default'}>
          <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 }
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify
            icon={'eva:trash-2-outline'}
            sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }}
          />
          Delete Layer
        </MenuItem>

        <MenuItem onClick={handleClickRename}>
          <Iconify icon={'eva:edit-fill'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          Rename Layer
        </MenuItem>
      </MenuPopover>
    </>
  );
}
