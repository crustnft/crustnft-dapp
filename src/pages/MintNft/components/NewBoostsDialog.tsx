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
import type { BoostProps } from '../MintNft.types';

export default function NewDialogBoost({
  openDialogBoosts,
  boosts,
  setBoosts,
  setOpenDialogBoosts
}: {
  openDialogBoosts: boolean;
  boosts: BoostProps[];
  setBoosts: React.Dispatch<React.SetStateAction<BoostProps[]>>;
  setOpenDialogBoosts: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newBoostType, setNewBoostType] = useState('');
  const [newValue, setNewValue] = useState<number>(0);
  const [newDisplayType, setNewDisplayType] = useState<'boost_percentage' | 'boost_number'>(
    'boost_number'
  );

  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleAddBoost = () => {
    if (newBoostType) {
      setBoosts([
        ...boosts,
        {
          boostType: newBoostType,
          value: newValue,
          displayType: newDisplayType
        }
      ]);
      setNewBoostType('');
      setNewValue(0);
    }
  };

  const handleRemoveLevel = (index: number) => {
    setBoosts(boosts.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={openDialogBoosts}
      onClose={() => {
        setOpenDialogBoosts(false);
      }}
      scroll={scroll}
    >
      <DialogContent dividers={scroll === 'paper'}>
        <Stack sx={{ p: 1, pb: 2 }} spacing={1}>
          <Typography variant="h5">Add Boosts</Typography>
          <Typography variant="body2">
            Levels show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>
        </Stack>

        <Stack sx={{ px: 1 }} spacing={1}>
          {boosts.map((row, index) => (
            <Stack key={row.boostType + index} direction="row" spacing={2}>
              <TextField size="small" value={row.boostType} disabled />
              <TextField value={row.value} size="small" type="number" disabled />
              <Typography sx={{ pt: 0.8 }}>of</Typography>
              <TextField value={row.value} size="small" type="number" disabled />
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
              value={newBoostType}
              onChange={(e) => {
                setNewBoostType(e.target.value);
              }}
              helperText="Enter a name e.g. level, speed, power, etc."
            />
            <TextField
              value={newValue}
              size="small"
              label="Value"
              type="number"
              onChange={(e) => {
                setNewValue(parseInt(e.target.value));
              }}
            />
            <Typography sx={{ pt: 0.8 }}>of</Typography>
            <TextField
              value={newValue}
              size="small"
              label="Max"
              type="number"
              onChange={(e) => {
                setNewValue(parseInt(e.target.value));
              }}
            />
            <IconButton onClick={handleAddBoost}>
              <Iconify icon="carbon:add-alt" />
            </IconButton>
          </Stack>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setOpenDialogBoosts(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
