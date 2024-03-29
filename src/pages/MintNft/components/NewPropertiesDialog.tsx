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
import type { PropertyProps } from '../MintNft.types';
export default function NewPropertiesDialog({
  openDialogProperties,

  setOpenDialogProperties
}: {
  openDialogProperties: boolean;

  setOpenDialogProperties: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newPropType, setNewPropType] = useState('');
  const [newName, setNewName] = useState('');
  const { setValue, watch } = useFormContext();

  const properties: PropertyProps[] = watch('properties');
  const handleAddProperty = () => {
    if (newPropType && newName) {
      setValue('properties', [
        ...properties,
        {
          name: newName,
          propType: newPropType
        }
      ]);
      setNewPropType('');
      setNewName('');
    }
  };

  const handleRemoveProperty = (index: number) => {
    setValue(
      'properties',
      properties.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog
      open={openDialogProperties}
      onClose={() => {
        setOpenDialogProperties(false);
      }}
      scroll="paper"
    >
      <DialogContent dividers={true}>
        <Stack sx={{ p: 1, pb: 2 }} spacing={1}>
          <Typography variant="h5">Add Properties</Typography>
          <Typography variant="body2">
            Properties show up underneath your item, are clickable, and can be filtered in your
            collection's sidebar.
          </Typography>
        </Stack>

        <Stack sx={{ px: 1 }} spacing={1}>
          {properties.map((row, index) => (
            <Stack key={row.propType + index} direction="row" spacing={2}>
              <TextField size="small" value={row.propType} disabled />
              <TextField placeholder="e.g. Female" value={row.name} size="small" disabled />
              <IconButton
                onClick={() => {
                  handleRemoveProperty(index);
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
              placeholder="e.g. Gender"
              size="small"
              value={newPropType}
              onChange={(e) => {
                setNewPropType(e.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              placeholder="e.g. Female"
              value={newName}
              size="small"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              autoComplete="off"
            />
            <IconButton onClick={handleAddProperty}>
              <Iconify icon="carbon:add-alt" />
            </IconButton>
          </Stack>
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setOpenDialogProperties(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
