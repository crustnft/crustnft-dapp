import {
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import Iconify from 'components/Iconify';
import { useState } from 'react';
import type { PropertyProps } from '../MintNft.types';

export default function NewPropertiesDialog({
  properties,
  setProperties,
  setOpenDialogProperties
}: {
  properties: PropertyProps[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyProps[]>>;
  setOpenDialogProperties: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newPropType, setNewPropType] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddProperty = () => {
    if (newPropType && newName) {
      setProperties([
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
    setProperties(properties.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <Stack sx={{ p: 3, pb: 2 }} spacing={1}>
        <Typography variant="h5">Add Properties</Typography>
        <Typography variant="body2">
          Properties show up underneath your item, are clickable, and can be filtered in your
          collection's sidebar.
        </Typography>
      </Stack>

      <Divider />
      <Stack sx={{ p: 2, pb: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((row, index) => (
                <TableRow key={row.propType + index}>
                  <TableCell>{row.propType}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <Iconify
                        icon="fluent:delete-24-filled"
                        onClick={() => {
                          handleRemoveProperty(index);
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack sx={{ p: 3, pt: 1 }} spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="e.g. Gender"
            size="small"
            value={newPropType}
            onChange={(e) => {
              setNewPropType(e.target.value);
            }}
          />
          <TextField
            placeholder="e.g. Female"
            value={newName}
            size="small"
            onChange={(e) => {
              setNewName(e.target.value);
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
            setOpenDialogProperties(false);
          }}
        >
          Save
        </Button>
      </Stack>
    </Card>
  );
}
