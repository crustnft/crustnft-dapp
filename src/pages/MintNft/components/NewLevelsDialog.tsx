import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import type { LevelProps } from '../MintNft.types';

export default function NewLevelsDialog({
  openDialogLevels,
  levels,
  setLevels,
  setOpenDialogLevels
}: {
  openDialogLevels: boolean;
  levels: LevelProps[];
  setLevels: React.Dispatch<React.SetStateAction<LevelProps[]>>;
  setOpenDialogLevels: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newLevelType, setNewLevelType] = useState('');
  const [newValue, setNewValue] = useState(0);
  const [newMax, setNewMax] = useState(0);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleAddProperty = () => {
    if (newLevelType && newMax) {
      setLevels([
        ...levels,
        {
          levelType: newLevelType,
          max: newMax,
          value: newValue
        }
      ]);
      setNewLevelType('');
      setNewValue(0);
    }
  };

  const handleRemoveLevel = (index: number) => {
    setLevels(levels.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={openDialogLevels}
      onClose={() => {
        setOpenDialogLevels(false);
      }}
      scroll={scroll}
    >
      <DialogContent dividers={scroll === 'paper'}>
        <Stack sx={{ p: 1, pb: 2 }} spacing={1}>
          <Typography variant="h5">Add Levels</Typography>
          <Typography variant="body2">
            Levels show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>
        </Stack>

        <Stack sx={{ px: 1 }} spacing={1}>
          {levels.map((row, index) => (
            <Stack key={row.levelType + index} direction="row" spacing={2}>
              <TextField size="small" value={row.levelType} disabled />
              <TextField placeholder="e.g. Female" value={row.value} size="small" disabled />
              <TextField placeholder="e.g. Female" value={row.max} size="small" disabled />

              <IconButton
                onClick={() => {
                  handleRemoveLevel(index);
                }}
              >
                <Iconify icon="fluent:delete-24-filled" />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Stack sx={{ p: 1, pt: 1 }} spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Name"
              size="small"
              value={newLevelType}
              onChange={(e) => {
                setNewLevelType(e.target.value);
              }}
            />
            <TextField
              value={newValue}
              size="small"
              label="Value"
              type="number"
              onChange={(e) => {
                if (parseInt(e.target.value)) {
                  setNewValue(parseInt(e.target.value));
                }
              }}
            />
            <TextField
              size="small"
              label="Max"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
            />
            <IconButton onClick={handleAddProperty}>
              <Iconify icon="carbon:add-alt" />
            </IconButton>
          </Stack>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setOpenDialogLevels(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
