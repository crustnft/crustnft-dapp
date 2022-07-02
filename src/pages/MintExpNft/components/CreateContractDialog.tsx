import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import { CloseSquareIcon } from 'assets/icons/customIcons';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import DeploySmartContract from './DeploySmartContract';
import SetupSmartContract from './SetupSmartContract';

type FormSmartContractConfig = {
  name: string;
  symbol: string;
  authorInfo: string;
  agreement: boolean;
};

const InitFormSmartContractConfig: FormSmartContractConfig = {
  name: '',
  symbol: '',
  authorInfo: '',
  agreement: true
};

const FormSmartContractSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  symbol: Yup.string()
    .required('Symbol is required')
    .transform((value) => value.toUpperCase()),
  authorInfo: Yup.string(),
  agreement: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});

interface CreateContractDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateContractDialog = ({ open, onClose: handleClose }: CreateContractDialogProps) => {
  const { signInWallet, pending } = useWeb3();
  const { isAuthenticated } = useAuth();

  const method = useForm<FormSmartContractConfig>({
    mode: 'onTouched',
    resolver: yupResolver(FormSmartContractSchema),
    defaultValues: InitFormSmartContractConfig
  });
  const [startedCreation, setStartedCreation] = useState(false);
  const [openMintingStatusDialog, setOpenMintingStatusDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, pending]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ display: openMintingStatusDialog ? 'none' : 'block' }}
    >
      <Paper
        sx={{
          p: '30px 70px',
          width: '60vw',
          maxWidth: '600px',
          overflowY: 'overlay',
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.light',
              margin: '15px 0'
            }
          },
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'primary.main'
            }
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'inherit'
          }
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: '30px' }}
        >
          <Typography variant="h4" color="text.header">
            Create new collection
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseSquareIcon />
          </IconButton>
        </Stack>

        <FormProvider {...method}>
          <SetupSmartContract />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: '30px' }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpenMintingStatusDialog(true);
              }}
              sx={{ py: '11px', width: '50%', maxWidth: '230px' }}
            >
              <Typography variant="buttonLarge" color="grey.0" sx={{ textTransform: 'none' }}>
                Create
              </Typography>
            </Button>
          </Box>
          <DeploySmartContract
            open={openMintingStatusDialog}
            onClose={() => setOpenMintingStatusDialog(false)}
            startedCreation={startedCreation}
            setStartedCreation={setStartedCreation}
            onCloseAll={() => {
              setOpenMintingStatusDialog(false);
              handleClose();
            }}
          />
        </FormProvider>
      </Paper>
    </Dialog>
  );
};

export default CreateContractDialog;
