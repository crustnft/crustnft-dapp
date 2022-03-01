// @mui
import { ClickAwayListener, IconButton, OutlinedInput, Paper, Stack, Tooltip } from '@mui/material';
import { KeyboardEvent, useState } from 'react';
// @types
import { ImageCard } from '../../../@types/imagesGCS';
// components
import Iconify from '../../../components/Iconify';
// utils
import uuidv4 from '../../../utils/uuidv4';

// ----------------------------------------------------------------------

const defaultTask = {
  imageUrl: ''
};

type Props = {
  onAddTask: (task: ImageCard) => void;
  onCloseAddTask: VoidFunction;
};

export default function ImageAdd({ onAddTask, onCloseAddTask }: Props) {
  const [name, setName] = useState('');

  const handleKeyUpAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (name.trim() !== '') {
        onAddTask({ ...defaultTask, id: uuidv4(), name });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name) {
      onAddTask({ ...defaultTask, id: uuidv4(), name });
    }
    onCloseAddTask();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Image name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' }
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Assign this task">
                <IconButton size="small">
                  <Iconify icon={'eva:people-fill'} width={20} height={20} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      </ClickAwayListener>
    </>
  );
}
