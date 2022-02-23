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
import type { StatProps } from '../MintNft.types';

export default function NewStatsDialog({
  openDialogStats,
  stats,
  setStats,
  setOpenDialogStats
}: {
  openDialogStats: boolean;
  stats: StatProps[];
  setStats: React.Dispatch<React.SetStateAction<StatProps[]>>;
  setOpenDialogStats: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newStatType, setNewStatType] = useState('');
  const [newValue, setNewValue] = useState<number>(0);
  const [newMax, setNewMax] = useState<number>(0);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleAddStat = () => {
    if (newStatType) {
      const validValue = newValue < 0 ? 0 : newValue;
      const validMax = newMax < validValue ? validValue : newMax;

      setStats([
        ...stats,
        {
          statType: newStatType,
          max: validMax,
          value: validValue
        }
      ]);
      setNewStatType('');
      setNewValue(0);
      setNewMax(0);
    }
  };

  const handleRemoveLevel = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={openDialogStats}
      onClose={() => {
        setOpenDialogStats(false);
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
          {stats.map((row, index) => (
            <Stack key={row.statType + index} direction="row" spacing={2}>
              <TextField size="small" value={row.statType} disabled />
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
              value={newStatType}
              onChange={(e) => {
                setNewStatType(e.target.value);
              }}
              helperText="Enter a name e.g. generation, etc."
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
              value={newMax}
              size="small"
              label="Max"
              type="number"
              onChange={(e) => {
                setNewMax(parseInt(e.target.value));
              }}
            />
            <IconButton onClick={handleAddStat}>
              <Iconify icon="carbon:add-alt" />
            </IconButton>
          </Stack>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setOpenDialogStats(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
