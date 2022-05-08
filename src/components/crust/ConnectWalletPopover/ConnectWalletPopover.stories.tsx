import ThemeProvider from 'theme';
import ConnectWalletPopover from './ConnectWalletPopover';
const ConnectWalletPopoverStories = {
  title: 'ConnectWalletPopover',
  component: ConnectWalletPopover
};
export default ConnectWalletPopoverStories;

export const Default = () => (
  <ThemeProvider theme="crust">
    <ConnectWalletPopover />
  </ThemeProvider>
);
