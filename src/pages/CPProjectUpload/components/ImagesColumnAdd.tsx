import { Button, ClickAwayListener, OutlinedInput, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../../../components/Iconify';
import { createColumn } from '../../../redux/slices/imagesGCS';
import { useDispatch } from '../../../redux/store';

export default function ImagesColumnAdd() {
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
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {!open && (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add layer
        </Button>
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
    </Paper>
  );
}