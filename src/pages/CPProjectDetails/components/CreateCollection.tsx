import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import ConfigureSmartContract from './components/ConfigureSmartContract';
import DeploySmartContract from './components/DeploySmartContract';

type FormSmartContractConfig = {
  name: string;
  symbol: string;
  cost: number;
  maxSupply: number;
  maxMintAmountPerTx: number;
  hiddenMetadataUri: string;
  authorInfo: string;
  agreement: boolean;
};

const InitFormSmartContractConfig: FormSmartContractConfig = {
  name: '',
  symbol: '',
  cost: 0,
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
  cost: Yup.number().required('Cost is required'),
  maxSupply: Yup.number().required('Max supply is required'),
  maxMintAmountPerTx: Yup.number().required('Max mint amount per tx is required'),
  hiddenMetadataUri: Yup.string().required('Hidden metadata uri is required'),
  authorInfo: Yup.string(),
  agreement: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});

export default function CreateCollection() {
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

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider {...method}>
        <ConfigureSmartContract startedCreation={startedCreation} />
        <DeploySmartContract
          startedCreation={startedCreation}
          setStartedCreation={setStartedCreation}
        />
      </FormProvider>
    </Card>
  );
}
