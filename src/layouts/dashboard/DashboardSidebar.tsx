import { Icon } from '@iconify/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, Drawer, ListItemText, Stack, Tooltip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MIconButton } from '../../components/@material-extend';
import LogoLong from '../../components/LogoLong';
import NavSection, {
  ListItemIconStyle,
  ListItemStyle,
  ListSubheaderStyle
} from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { DISCORD, MEDIUM, TELEGRAM, TWITTER } from '../../constants/socialMedias';
import useSettings from '../../hooks/useSettings';
import sidebarConfig from './SidebarConfig';

const DRAWER_WIDTH = 280;

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) => {
  const { pathname } = useLocation();
  const { themeMode, onToggleMode } = useSettings();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <LogoLong />
        </Box>
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
          subheader={<ListSubheaderStyle>Setting</ListSubheaderStyle>}
        >
          <ListItem sx={{ p: '0px', pr: '10%' }}>
            <ListItemStyle>
              <ListItemIconStyle>
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 4,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {' '}
                  <DarkModeIcon />
                </Box>
              </ListItemIconStyle>
              <ListItemText disableTypography primary={'Dark Mode'} />
            </ListItemStyle>
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
