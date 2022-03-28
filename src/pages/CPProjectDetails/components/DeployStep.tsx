import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { Box, Card, Dialog, DialogContent, Grid, Stack, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import ConfigDeployedSmartContract from './ConfigDeployedSmartContract';
import ConfigureSmartContract from './ConfigureSmartContract';
import DeploySmartContract from './DeploySmartContract';
type FormSmartContractConfig = {
  name: string;
  symbol: string;
  cost: string;
  maxSupply: number;
  maxMintAmountPerTx: number;
  hiddenMetadataUri: string;
  authorInfo: string;
  agreement: boolean;
};

const InitFormSmartContractConfig: FormSmartContractConfig = {
  name: '',
  symbol: '',
  cost: '0',
  maxSupply: 0,
  maxMintAmountPerTx: 1,
  hiddenMetadataUri: 'ipfs://__CID__.json',
  authorInfo: '',
  agreement: true
};

const FormSmartContractSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  symbol: Yup.string()
    .required('Symbol is required')
    .transform((value) => value.toUpperCase()),
  cost: Yup.string().required('Cost is required'),
  maxSupply: Yup.number().required('Max supply is required'),
  maxMintAmountPerTx: Yup.number().required('Max mint amount per tx is required'),
  hiddenMetadataUri: Yup.string().required('Hidden metadata uri is required'),
  authorInfo: Yup.string(),
  agreement: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});

export default function DeployStep({ maxNft }: { maxNft: number }) {
  const [openDeploySm, setOpenDeploySm] = useState(false);
  const [openConfigSm, setOpenConfigSm] = useState(false);
  const { signInWallet } = useWeb3();
  const { isAuthenticated } = useAuth();

  const method = useForm<FormSmartContractConfig>({
    mode: 'onTouched',
    resolver: yupResolver(FormSmartContractSchema),
    defaultValues: InitFormSmartContractConfig
  });
  const [startedCreation, setStartedCreation] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet]);

  useEffect(() => {
    const { setValue } = method;
    setValue('maxSupply', maxNft);
  }, [maxNft]);

  return (
    <>
      <Stack>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          2. Deploy smart contract
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          You have to generate the images and metadata from step 1 first, otherwise you need to
          upload yourself the images and metadata on IPFS
        </Typography>
        <Grid container sx={{ mt: 2 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                p: 3,
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: 'background.neutral',
                  border: '1px solid #15B2E5'
                }
              }}
              onClick={() => setOpenDeploySm(true)}
            >
              <Stack
                spacing={2}
                alignItems="center"
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                  width: 1,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Icon icon="carbon:deployment-pattern" height="40" color="#637381" />

                <Box>
                  <Typography gutterBottom variant="h5">
                    Deploy smart contract
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Select your preferred network and deploy your smart contract
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                p: 3,
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: 'background.neutral',
                  border: '1px solid #15B2E5'
                }
              }}
              onClick={() => setOpenConfigSm(true)}
            >
              <Stack
                spacing={2}
                alignItems="center"
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                  width: 1,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Icon icon="icon-park-outline:setting-config" height="40" color="#637381" />

                <Box>
                  <Typography gutterBottom variant="h5">
                    Configure the collection
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Configure the collection you deployed previously
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={openDeploySm}
        onClose={() => {
          setOpenDeploySm(false);
        }}
        scroll="paper"
      >
        <DialogContent dividers={true}>
          <Card sx={{ p: 3 }}>
            <FormProvider {...method}>
              <ConfigureSmartContract startedCreation={startedCreation} />
              <DeploySmartContract
                startedCreation={startedCreation}
                setStartedCreation={setStartedCreation}
              />
            </FormProvider>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={true}
        onClose={() => {
          setOpenConfigSm(false);
        }}
        scroll="paper"
      >
        <DialogContent dividers={true}>
          <ConfigDeployedSmartContract />
        </DialogContent>
      </Dialog>
    </>
  );
}
