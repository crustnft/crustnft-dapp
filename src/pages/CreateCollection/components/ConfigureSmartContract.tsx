import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { Controller, useFormContext } from 'react-hook-form';
import SmartContractDialogs from './SmartContractDialogs';

export default function ConfigureSmartContract({ startedCreation }: { startedCreation: boolean }) {
  const { control, watch } = useFormContext();
  const { active, account } = useWeb3();
  const { chain: selectedChain } = useWallet();
  const [name, symbol] = watch(['name', 'symbol']);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Typography
        variant="overline"
        sx={{
          mb: 3,
          display: active && isAuthenticated ? 'none' : 'block',
          color: 'text.secondary'
        }}
      >
        Select network & Connect wallet
      </Typography>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          mb: 3,
          width: 1,
          display: active && isAuthenticated ? 'none' : 'block',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="subtitle2">
          You need to connect a wallet to create the NFTs collection
        </Typography>
      </Paper>

      <Box sx={{ display: active && isAuthenticated ? 'block' : 'none' }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                mb: 2,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
                Settings
                <Typography variant="overline" sx={{ color: '#FF4842', display: 'inline' }}>
                  *
                </Typography>
              </Typography>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    margin="normal"
                    error={Boolean(error)}
                    disabled={startedCreation}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="symbol"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                    value={field.value}
                    label="Token Symbol"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(error)}
                    disabled={startedCreation}
                    helperText={error?.message}
                  />
                )}
              />

              <Divider sx={{ my: 3 }} />
              <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
                Additional info (optional)
              </Typography>
              <Controller
                control={control}
                name="authorInfo"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    disabled={startedCreation}
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Preview Collection
              </Typography>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2">{name || 'Collection Name'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">{symbol || 'CRUSTNFT'}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Network
                  </Typography>
                  <Typography variant="subtitle2">{selectedChain?.name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    {account}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>
                <Paper
                  sx={{
                    mb: 3,
                    p: 0.5,
                    border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`,
                    '& > :not(style)': {
                      m: 0.5
                    }
                  }}
                >
                  <Chip size="small" label="Ownable"></Chip>
                  <Chip size="small" label="Enumarable"></Chip>
                  <Chip size="small" label="Expandable"></Chip>
                </Paper>
                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            <SmartContractDialogs />
            <Button variant="outlined" size="small" fullWidth={false}>
              Our commitments
            </Button>
          </Stack>

          <Controller
            control={control}
            name="agreement"
            render={({ field, fieldState: { error } }) => (
              <FormControlLabel
                disabled={startedCreation}
                control={<Checkbox {...field} defaultChecked />}
                label="I agree with the smart contract provided by Crustnft"
                sx={{ color: error ? '#FF4842' : '#212B36' }}
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}
