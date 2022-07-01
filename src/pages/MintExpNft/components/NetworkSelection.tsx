import { Box, Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useContext, useEffect } from 'react';
import { Theme } from 'theme';
import { getChainByNetworkName, getChainIdByNetworkName } from 'utils/blockchainHandlers';
import { MintContext } from '../MintNft';

const NetworkSelection = ({ networkChoice }: { networkChoice?: string }) => {
  const { chain: selectedNetwork, onNetworkChange: setSelectedNetwork } = useWallet();
  const theme = useTheme() as Theme;
  const { setTab } = useContext(MintContext);
  const { switchNetwork, connectedChain } = useWeb3();

  const handleClick = (name: string) => {
    const chainId = getChainIdByNetworkName(name);
    if (!chainId) return;
    switchNetwork(chainId);
  };

  useEffect(() => {
    if (!networkChoice) return;
    if (networkChoice !== selectedNetwork.name) {
      const chain = getChainByNetworkName(networkChoice);
      if (!chain) return;
      setSelectedNetwork(chain);
    }
  }, [selectedNetwork, networkChoice, setSelectedNetwork]);

  useEffect(() => {
    if (!connectedChain) return;
    if (connectedChain.name !== selectedNetwork.name) {
      setSelectedNetwork(connectedChain);
    }
  }, [connectedChain, selectedNetwork, setSelectedNetwork]);

  return (
    <Stack>
      <Typography variant="h5" color="text.primary">
        {networkChoice ? 'Selected network' : 'Choose a network'}
      </Typography>
      <Grid container spacing="30px" sx={{ mt: '5px' }}>
        {SUPPORTED_CHAINS.map(({ name, icon }, index) => (
          <Grid item key={index} xs={12} md={6} lg={4} display="flex" justifyContent="center">
            <Button
              startIcon={
                <Box
                  component="img"
                  src={icon}
                  alt="icon"
                  sx={{
                    width: '42px',
                    height: '42px',
                    mr: '10px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                />
              }
              onClick={() => {
                handleClick(name);
              }}
              sx={[
                {
                  width: '100%',
                  height: '100%',
                  py: '20px',
                  border: '2px solid',
                  borderColor: 'textField.borderColor'
                },
                selectedNetwork.name.toLowerCase() === name.toLowerCase() && {
                  backgroundColor: 'accent.lighter',
                  borderColor: 'accent.main'
                }
              ]}
              disabled={
                networkChoice ? selectedNetwork.name.toLowerCase() !== name.toLowerCase() : false
              }
            >
              {name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{
          mt: '30px',
          p: '11px 75px',
          width: 'fit-content',
          textTransform: 'none',
          ...theme.typography.buttonLarge
        }}
        onClick={() => {
          setTab('Create');
        }}
      >
        Next
      </Button>
    </Stack>
  );
};

export default NetworkSelection;
