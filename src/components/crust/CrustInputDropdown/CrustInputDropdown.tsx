import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { RefObject, useMemo, useState } from 'react';
import CrustInput, { CurstInputProps } from '../CrustInput';

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
export type CrustInputDropdownValue<T> = { label: string; suffix?: string; value: T };
export default function CrustInputDropdown<D = string>({
  dropdownProps,
  ...props
}: CurstInputProps & {
  dropdownProps: {
    onToggle: () => void;
    onChange: (value: D) => void;
    isOpen?: boolean;
    value: any;
    items: Array<CrustInputDropdownValue<D>>;
  };
}) {
  const { items = [], isOpen = false } = dropdownProps;
  const dropdownLabel = useMemo(() => {
    if (dropdownProps.value) {
      const item = items.find(({ value }) => dropdownProps.value === value);
      return item?.suffix ?? item?.label;
    }
    return null;
  }, [dropdownProps.value, items]);
  console.log(dropdownProps.value, dropdownLabel);
  const [anchorEl] = useState<RefObject<HTMLAnchorElement>>(React.createRef());

  return (
    <CrustInput
      {...props}
      endAdornment={
        <InputAdornment position="end">
          <Typography variant="subtitle1">{dropdownLabel}</Typography>
          <IconButton onClick={dropdownProps.onToggle} size="small" sx={{ mr: -1 }}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <a ref={anchorEl}></a>
          <StyledMenu
            anchorEl={anchorEl.current as HTMLElement}
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button'
            }}
            open={isOpen}
            onClose={dropdownProps.onToggle}
          >
            {items.map(({ label, value }) => (
              <MenuItem
                key={value as unknown as string}
                onClick={() => {
                  dropdownProps.onChange(value);
                  dropdownProps.onToggle();
                }}
                disableRipple
              >
                {label}
              </MenuItem>
            ))}
          </StyledMenu>
        </InputAdornment>
      }
    />
  );
}
