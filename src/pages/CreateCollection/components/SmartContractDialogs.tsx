import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import GppGoodIcon from '@mui/icons-material/GppGood';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { getContract } from 'constants/contract';
import { forwardRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography
} from '../../../components/@c-components';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
export default function SmartContractDialogs() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const source = getContract();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleClickOpen}
        color="info"
        sx={{ backgroundColor: '#377dff' }}
      >
        View smart contract
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Smart contract's full code
            </Typography>
            <Tooltip title="Copy">
              <IconButton color="inherit">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in Remix">
              <IconButton color="inherit">
                <IntegrationInstructionsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View the source on Github">
              <IconButton color="inherit">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Audit Certification">
              <IconButton color="inherit">
                <GppGoodIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box
          component={SyntaxHighlighter}
          language={'javascript'}
          style={androidstudio}
          padding={`${theme.spacing(2)} !important`}
          margin={`${theme.spacing(0)} !important`}
          bgcolor={'#21325b !important'}
        >
          {source}
        </Box>
      </Dialog>
    </>
  );
}
