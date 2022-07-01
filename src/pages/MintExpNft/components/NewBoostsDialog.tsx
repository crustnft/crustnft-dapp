import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Iconify from '../../../components/Iconify';
import type { BoostProps } from '../MintNft.types';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export default function NewDialogBoost({
  openDialog,
  setOpenDialog
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newBoostType, setNewBoostType] = useState('');
  const [newRawValue, setNewRawValue] = useState<string>('');
  const [newDisplayType, setNewDisplayType] = useState<'boost_percentage' | 'boost_number'>(
    'boost_percentage'
  );

  const { setValue, watch } = useFormContext();
  const boosts: BoostProps[] = watch('boosts');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddBoost = () => {
    if (newBoostType) {
      if (!isNaN(parseInt(newRawValue))) {
        setValue('boosts', [
          ...boosts,
          {
            boostType: newBoostType,
            value: parseInt(newRawValue),
            displayType: newDisplayType
          }
        ]);

        setNewBoostType('');
        setNewRawValue('');
      }
    }
  };

  const handleRemoveLevel = (index: number) => {
    setValue(
      'boosts',
      boosts.filter((_, i) => i !== index)
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
          <Typography variant="h5">Add Boosts</Typography>
          <Typography variant="body2">
            Number or percentage boosts that show up as a circular boost
          </Typography>
        </Stack>

        <Stack sx={{ px: 1 }} spacing={1}>
          {boosts.map((row, index) => (
            <Stack key={row.boostType + index} direction="row" spacing={2}>
              <TextField size="small" value={row.boostType} disabled />
              <TextField
                value={`${row.value.toString()}${
                  row.displayType === 'boost_percentage' ? '%' : ''
                }`}
                size="small"
                type="string"
                disabled
              />
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
              autoComplete="off"
            />

            <FormControl size="small" sx={{ m: 1, width: '15ch' }}>
              <InputLabel htmlFor="outlined-adornment-password">Value</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={newRawValue}
                onChange={(e) => {
                  setNewRawValue(e.target.value);
                }}
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography variant="subtitle1">
                      {newDisplayType === 'boost_percentage' ? '%' : ''}
                    </Typography>
                    <IconButton onClick={handleClick} size="small" sx={{ mr: -1 }}>
                      <KeyboardArrowDownIcon />
                    </IconButton>

                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button'
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          setNewDisplayType('boost_number');
                          setAnchorEl(null);
                        }}
                        disableRipple
                      >
                        Number
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setNewDisplayType('boost_percentage');
                          setAnchorEl(null);
                        }}
                        disableRipple
                      >
                        Percentage
                      </MenuItem>
                    </StyledMenu>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <IconButton onClick={handleAddBoost}>
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
