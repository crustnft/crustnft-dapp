import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Container } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Page from '../../components/Page';
import ConfigureSmartContract from './components/ConfigureSmartContract';
import DeploySmartContract from './components/DeploySmartContract';
import Introduction from './components/Introduction';

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

export default function CreateCollection() {
  const { active, account, library } = useWeb3();
  const { isAuthenticated, challengeLogin, login, accessToken } = useAuth();

  const method = useForm<FormSmartContractConfig>({
    mode: 'onTouched',
    resolver: yupResolver(FormSmartContractSchema),
    defaultValues: InitFormSmartContractConfig
  });
  const [startedCreation, setStartedCreation] = useState(false);
  useEffect(() => {
    const signIn = async () => {
      if (active && account && library) {
        if (!isAuthenticated) {
          const signingMessage = await challengeLogin(account);
          if (!signingMessage) return;
          const signer = library.getSigner(account);
          const signature = await signer.signMessage(signingMessage);
          login(account, signature);
        }
      }
    };
    signIn();
  }, [active, isAuthenticated, account, challengeLogin, library, login]);

  return (
    <Page title="Create NFTs Collection">
      <Container maxWidth={'lg'}>
        <Introduction />
        <Card sx={{ p: 3 }}>
          <FormProvider {...method}>
            <ConfigureSmartContract startedCreation={startedCreation} />
            <DeploySmartContract
              startedCreation={startedCreation}
              setStartedCreation={setStartedCreation}
            />
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
}
