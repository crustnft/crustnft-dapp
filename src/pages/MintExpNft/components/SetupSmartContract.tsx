import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { EyeIcon, ShieldDoneIcon } from 'assets/icons/customIcons';
import {
  getContract,
  setAuthorInfo,
  setName,
  setSymbol
} from 'constants/expandingCollectionContract';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Theme } from 'theme';
import SmartContractDialog from './SmartContractDialog';

const SetupSmartContract = () => {
  const { control, watch } = useFormContext();

  const [openSmartContractDialog, setOpenSmartContractDialog] = useState(false);
  const [name, symbol, authorInfo] = watch(['name', 'symbol', 'authorInfo']);
  const [source, setSource] = useState('');

  useEffect(() => {
    setName(name);
    setSymbol(symbol);
    setAuthorInfo(authorInfo);
    setSource(getContract());
  }, [name, symbol, authorInfo]);

  return (
    <>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Token Name
      </Typography>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            variant="outlined"
            autoComplete="off"
            size="small"
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            placeholder={`e.g "Crypto Punk"`}
            sx={{ m: '15px 0 20px 0' }}
          />
        )}
      />

      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Token symbol
      </Typography>
      <Controller
        control={control}
        name="symbol"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e: any) => {
              field.onChange(e.target.value.toUpperCase());
            }}
            value={field.value}
            autoComplete="off"
            variant="outlined"
            size="small"
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            placeholder={`e.g "CP"`}
            sx={{ m: '15px 0 20px 0' }}
          />
        )}
      />

      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Author (optional)
      </Typography>
      <Controller
        control={control}
        name="authorInfo"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            variant="outlined"
            autoComplete="off"
            size="small"
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            placeholder={`e.g "Crust"`}
            sx={{ m: '20px 0 20px 0' }}
          />
        )}
      />

      <Stack direction="row">
        <Button startIcon={<EyeIcon />} onClick={() => setOpenSmartContractDialog(true)}>
          <Typography
            variant="buttonSmall"
            sx={{ color: 'text.quaternary', textTransform: 'none' }}
          >
            View smart contract
          </Typography>
        </Button>
        <SmartContractDialog
          open={openSmartContractDialog}
          onClose={() => setOpenSmartContractDialog(false)}
          source={source}
        />

        <Box
          sx={{
            margin: '5px 5px 5px 0',
            border: '1px solid',
            borderColor: (theme) => (theme as Theme).palette.background.quaternary
          }}
        />
        <Button startIcon={<ShieldDoneIcon />}>
          <Typography
            variant="buttonSmall"
            sx={{ color: 'text.quaternary', textTransform: 'none' }}
          >
            Our commitment
          </Typography>
        </Button>
      </Stack>

      <Controller
        control={control}
        name="agreement"
        render={({ field, fieldState: { error } }) => (
          <FormControlLabel
            {...field}
            control={<Checkbox></Checkbox>}
            label="I agree with the smart contract provided by CrustNFT"
          />
        )}
      />
    </>
  );
};

export default SetupSmartContract;
