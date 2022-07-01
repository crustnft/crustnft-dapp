import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Iconify from '../../../components/Iconify';
import type { LevelProps } from '../MintNft.types';

export default function NewLevelsDialog({
  openDialog,
  setOpenDialog
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newLevelType, setNewLevelType] = useState('');
  const [newValue, setNewValue] = useState<number>(0);
  const [newMax, setNewMax] = useState<number>(0);
  const { setValue, watch } = useFormContext();

  const levels: LevelProps[] = watch('levels');

  const handleAddLevel = () => {
    if (newLevelType) {
      const validValue = newValue < 0 ? 0 : newValue;
      const validMax = newMax < validValue ? validValue : newMax;

      setValue('levels', [
        ...levels,
        {
          levelType: newLevelType,
          value: validValue,
          max: validMax
        }
      ]);

      setNewLevelType('');
      setNewValue(0);
      setNewMax(0);
    }
  };

  const handleRemoveLevel = (index: number) => {
    setValue(
      'levels',
      levels.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        setOpenDialog(false);
      }}
      scroll="paper"
    >
      <DialogContent dividers={true}>
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
              <TextField value={row.value} size="small" type="number" disabled />
              <Typography sx={{ pt: 0.8 }}>of</Typography>
              <TextField value={row.max} size="small" type="number" disabled />
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
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <TextField
              label="Name"
              size="small"
              value={newLevelType}
              onChange={(e) => {
                setNewLevelType(e.target.value);
              }}
              helperText="Enter a name e.g. level, speed, power, etc."
              autoComplete="off"
            />
            <TextField
              value={newValue}
              size="small"
              label="Value"
              type="number"
              onChange={(e) => {
                setNewValue(parseInt(e.target.value));
              }}
              autoComplete="off"
            />
            <Typography sx={{ pt: 0.8 }}>of</Typography>
            <TextField
              value={newMax}
              size="small"
              label="Max"
              type="number"
              onChange={(e) => {
                setNewMax(parseInt(e.target.value));
              }}
              autoComplete="off"
            />
            <IconButton onClick={handleAddLevel}>
              <Iconify icon="carbon:add-alt" />
            </IconButton>
          </Stack>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
