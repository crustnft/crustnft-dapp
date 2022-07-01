import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ButtonPopover from 'components/ButtonPopover';
import useWeb3 from 'hooks/useWeb3';
import { Chain } from 'interfaces/chain';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_CHAINS } from '../../constants/chains';

export default function NetworkPopover() {
  const { deactivate, switchNetwork, connectedChain, active } = useWeb3();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (chain: Chain) => {
    if (!active) {
      navigate('/');
    } else {
      switchNetwork(chain.chainId);
    }
  };

  const MenuHeader = () => (
    <Typography variant="subtitle1" sx={{ p: 1.5 }}>
      Networks <Typography component="span">({SUPPORTED_CHAINS.length})</Typography>
    </Typography>
  );
  return (
    <ButtonPopover
      displayName={active ? connectedChain?.name || 'No network' : 'No network'}
      menuHeader={<MenuHeader />}
      sx={[theme.palette.customCSS.buttonHeader, { ml: '15px !important' }]}
    >
      {SUPPORTED_CHAINS.map((chain) => (
        <MenuItem
          key={chain.chainId}
          selected={chain.chainId === (connectedChain?.chainId || 1)}
          onClick={() => {
            handleClick(chain);
          }}
          sx={{ px: 2.5 }}
        >
          <ListItemIcon>
            <Box component="img" alt={chain.name} src={chain.icon} sx={{ height: '30px' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{chain.name}</ListItemText>
        </MenuItem>
      ))}
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Button variant="outlined" size="small" onClick={deactivate}>
          Reset Wallet
        </Button>
      </Stack>
    </ButtonPopover>
  );
}
