import { Box, Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { SUPPORTED_CHAINS } from 'constants/chains';
import { useContext, useState } from 'react';
import { Theme } from 'theme';
import { MintContext } from '../MintNft';

const NetworkSelection = ({ networkChoice }: { networkChoice?: string }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(networkChoice || SUPPORTED_CHAINS[0].name);
  const handleSelectNetwork = (network: string) => {
    setSelectedNetwork(network);
  };
  const theme = useTheme() as Theme;
  const { setTab } = useContext(MintContext);

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
              onClick={() => handleSelectNetwork(name)}
              sx={[
                {
                  width: '100%',
                  height: '100%',
                  py: '20px',
                  border: '2px solid',
                  borderColor: 'textField.borderColor'
                },
                selectedNetwork.toLowerCase() === name.toLowerCase() && {
                  backgroundColor: 'accent.lighter',
                  borderColor: 'accent.main'
                }
              ]}
              disabled={
                networkChoice ? selectedNetwork.toLowerCase() !== name.toLowerCase() : false
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
