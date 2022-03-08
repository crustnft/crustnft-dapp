import { Icon } from '@iconify/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Identicons from '@nimiq/identicons';
import { EMPTY_CHAIN, SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Drawer,
  Link,
  Stack,
  Tooltip,
  Typography
} from '../../components/@c-components';
import { MIconButton } from '../../components/@material-extend';
import LogoLong from '../../components/LogoLong';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { DISCORD, MEDIUM, TELEGRAM, TWITTER } from '../../constants/COMMON_VARIABLES';
import useSettings from '../../hooks/useSettings';
import { Chain } from '../../interfaces/chain';
import { shortenAddress } from '../../utils/formatAddress';
import sidebarConfig from './SidebarConfig';

Identicons.svgPath = './static/identicons.min.svg';

// const DRAWER_WIDTH = 280;
// const COLLAPSE_WIDTH = 102;
const DRAWER_WIDTH = 280;
// const COLLAPSE_WIDTH = 0;

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_12]
}));

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) => {
  const { pathname } = useLocation();
  const { chain: selectedChain } = useWallet();
  const [network, setNetwork] = useState<Chain>(selectedChain);
  const { active: walletIsConnected, account, connectedChainId } = useWeb3();
  const { themeMode, onToggleMode } = useSettings();
  useEffect(() => {
    const found = SUPPORTED_CHAINS.find((chain) => chain.chainId === connectedChainId);
    if (found) {
      setNetwork(found);
    } else {
      setNetwork(EMPTY_CHAIN);
    }
  }, [connectedChainId]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const infoToDisplay = () => {
    return (
      <>
        <Typography variant="subtitle1" noWrap>
          {shortenAddress(account || '', 5)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {network.name}
        </Typography>
      </>
    );
  };

  const [uniqueIcon, setUniqueIcon] = useState<string>();
  useEffect(() => {
    Identicons.toDataUrl(`${network.currencySymbol.toLowerCase()}:${account}`).then(
      (img: string) => {
        setUniqueIcon(img);
      }
    );
  }, [account, network.currencySymbol]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <LogoLong />
          </Box>
        </Stack>
        {walletIsConnected && (
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar alt="My Avatar" src={uniqueIcon} />
              <Box
                sx={{
                  ml: 2,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {infoToDisplay()}
              </Box>
            </AccountStyle>
          </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} />

      <Box
        sx={{
          pl: 3.5,
          '& > *': { mx: 0.5, my: 0.5 }
        }}
      >
        <Tooltip key="discord" title="Discord">
          <MIconButton onClick={() => window.open(DISCORD, '_blank')}>
            <Icon icon="bi:discord" width={24} height={24} />
          </MIconButton>
        </Tooltip>
        <Tooltip key="telegram" title="Telegram">
          <MIconButton onClick={() => window.open(TELEGRAM, '_blank')}>
            <Icon icon="uim:telegram-alt" width={24} height={24} />
          </MIconButton>
        </Tooltip>
        <Tooltip key="twitter" title="Twitter">
          <MIconButton onClick={() => window.open(TWITTER, '_blank')}>
            <Icon icon="akar-icons:twitter-fill" width={24} height={24} />
          </MIconButton>
        </Tooltip>
        <Tooltip key="medium" title="Medium">
          <MIconButton onClick={() => window.open(MEDIUM, '_blank')}>
            <Icon icon="ant-design:medium-square-filled" width={24} height={24} />
          </MIconButton>
        </Tooltip>
      </Box>
      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Settings</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Dark mode" />
            <Switch
              edge="end"
              onChange={onToggleMode}
              checked={themeMode === 'dark'}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi'
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Scrollbar>
  );

  return (
    <>
      <Drawer
        open={isOpenSidebar}
        onClose={onCloseSidebar}
        PaperProps={{
          sx: { width: DRAWER_WIDTH }
        }}
      >
        {renderContent}
      </Drawer>
    </>
  );
};

export default React.memo(DashboardSidebar);
