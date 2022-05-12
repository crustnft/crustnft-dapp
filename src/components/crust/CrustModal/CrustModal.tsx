import { Typography, TypographyProps } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CrustModalContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import uuidv4 from 'utils/uuidv4';
import { IconCloseSquare } from '../icons';
const CrustDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
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
  justifyContent: 'center'
}));

const CrustModalTitle = (props: CrustModalTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <CrustTitle variant="h4">{children}</CrustTitle>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <IconCloseSquare />
        </IconButton>
      ) : null}
    </DialogTitle>
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
