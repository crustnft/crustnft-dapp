import {
  Box,
  ButtonBase,
  ClickAwayListener,
  OutlinedInput,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../../../components/Iconify';
import { createColumn } from '../../../redux/slices/imagesGCS';
import { useDispatch } from '../../../redux/store';

export default function ImagesColumnAdd() {
  const theme = useTheme();
  const nameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (name) {
        dispatch(createColumn({ name }));
        setName('');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateColumn();
    }
  };

  return (
    <Box
      sx={{
        height: '300px',
        width: '100%',
        borderRadius: '15px',
        border: `dashed 5px ${theme.palette.divider}`
      }}
    >
      {!open && (
        <Stack alignItems="center" spacing={3} justifyContent="center" sx={{ height: '100%' }}>
          <Iconify icon={'eva:plus-fill'} width={50} height={50} />
          <ButtonBase onClick={handleOpen}>
            <Typography variant="h5">Add layer</Typography>
          </ButtonBase>
          <Typography variant="caption">
            The lower layer will be displayed on top of the layers above, drag and drop if you want
            to reorder the layers
          </Typography>
        </Stack>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <OutlinedInput
            fullWidth
            placeholder="New Layer"
            inputRef={nameRef}
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: 'h6' }}
          />
        </ClickAwayListener>
      )}
    </Box>
  );
}
