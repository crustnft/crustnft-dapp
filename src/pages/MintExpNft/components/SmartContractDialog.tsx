import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import GppGoodIcon from '@mui/icons-material/GppGood';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { AppBar, Box, Dialog, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CloseIcon } from 'theme/overrides/CustomIcons';

interface SmartContractDialogProps {
  open: boolean;
  onClose: () => void;
  source: string;
}

const SmartContractDialog = ({ open, onClose: handleClose, source }: SmartContractDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
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
  );
};

export default SmartContractDialog;
