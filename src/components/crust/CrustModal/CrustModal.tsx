import { Box, Dialog, DialogActions, Typography, TypographyProps } from '@mui/material';
import CrustModalContent, { DialogContentProps } from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { pxToRem } from 'utils/getFontValue';
import uuidv4 from 'utils/uuidv4';
import { IconCloseSquare } from '../icons';
const CrustDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: `${pxToRem(30)} ${pxToRem(70)}`
  }
}));

export interface CrustModalTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const CrustTitle = styled(Typography)(({ theme }) => ({
  color: theme.colors?.secondary.main
}));
const CrustModalActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'center',
  paddingBottom: pxToRem(31)
}));

const CrustModalTitle = (props: CrustModalTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <Box sx={{ m: 0, px: pxToRem(70), pt: pxToRem(31) }} {...other}>
      <CrustTitle variant="h4">{children}</CrustTitle>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: pxToRem(60),
            top: pxToRem(31),
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <IconCloseSquare />
        </IconButton>
      ) : null}
    </Box>
  );
};
type ButtonPropsType = { onClick?: (...args: Array<any>) => void };
type ButtonType = React.ReactElement<ButtonPropsType>;
export type CrustModalProps = {
  button: ButtonType;
  children: DialogContentProps['children'];
  title: TypographyProps['children'];
  actions: ButtonType | Array<ButtonType>;
};

const createAction = (action: ButtonType, handleClose: () => void) =>
  React.cloneElement(action, {
    onClick: (...args: Array<any>) => {
      let close = handleClose;
      if (action.props.onClick) {
        const [e, ...rest] = args;
        action.props.onClick(
          {
            ...e,
            preventDefault: () => {
              e.preventDefault();
              close = () => {};
            }
          },
          ...rest
        );
      }
      close();
    }
  });
export default function CrustModal({ button, children, actions, title }: CrustModalProps) {
  const [id] = React.useState(uuidv4());
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = React.useCallback(
    (...args) => {
      setOpen(true);
      if (button.props.onClick) {
        button.props.onClick(...args);
      }
    },
    [setOpen, button]
  );
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const modalButton = React.useMemo(
    () =>
      React.cloneElement(button, {
        onClick: handleClickOpen
      }),
    [button, handleClickOpen]
  );
  const modalActions = React.useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map((action) => createAction(action, handleClose));
    }
    return createAction(actions, handleClose);
  }, [actions, handleClose]);

  return (
    <>
      {modalButton}
      <CrustDialog onClose={handleClose} aria-labelledby={id} open={open}>
        <CrustModalTitle id={id} onClose={handleClose}>
          {title}
        </CrustModalTitle>
        <CrustModalContent>{children}</CrustModalContent>
        <CrustModalActions>{modalActions}</CrustModalActions>
      </CrustDialog>
    </>
  );
}
