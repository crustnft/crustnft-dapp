import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from '@mui/material';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { createContract } from 'clients/crustnft-explore-api/contracts';
import Iconify from 'components/Iconify';
import {
  getContract,
  getContractName,
  setAuthorInfo,
  setName,
  setSymbol
} from 'constants/expandingCollectionContract';
import { SOLIDITY_COMPILER_VERSION, SPDX_LICENSE_IDENTIFIER } from 'constants/solcEnvironments';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  compileSmartContract,
  deploySmartContract,
  getPublishingStatus,
  publishSmartContract
} from 'services/createSmartContract/evmCompatible/';
import LightTooltip from '../../../components/LightTooltip';
import { DoingIcon, ErrorIcon, SuccessIcon } from '../../../components/StepperIcons';

export default function DeploySmartContract({
  startedCreation,
  setStartedCreation
}: {
  startedCreation: boolean;
  setStartedCreation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useFormContext();
  const { active, account, library } = useWeb3();
  const { chain: selectedChain } = useWallet();
  const [activeStep, setActiveStep] = useState(0);
  const [source, setSource] = useState('');

  const [name, symbol, authorInfo] = watch(['name', 'symbol', 'authorInfo']);

  useEffect(() => {
    setName(name);
    setSymbol(symbol);
    setAuthorInfo(authorInfo);
    setSource(getContract());
  }, [name, symbol, authorInfo]);

  const [compiling, setCompiling] = useState(false);
  const [compilingSuccess, setCompilingSuccess] = useState(false);
  const [compilingError, setCompilingError] = useState(false);

  const [deploying, setDeploying] = useState(false);
  const [deployingSuccess, setDeployingSuccess] = useState(false);
  const [deployingError, setDeployingError] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [publishingSuccess, setPublishingSuccess] = useState(false);
  const [publishingError, setPublishingError] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [verifyingSuccess, setVerifyingSuccess] = useState(false);
  const [verifyingError, setVerifyingError] = useState(false);

  const [txHash, setTxHash] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const [compileResult, setCompileResult] = useState<CompilerAbstract | undefined>(undefined);
  const [txReceipt, setTxReceipt] = useState<any>();
  const [etherscanPublishingHx, setEtherscanPublishingHx] = useState<string | undefined>(undefined);
  const [theWholeProcessState, setTheWholeProcessState] = useState<
    'notstarted' | 'success' | 'error'
  >('notstarted');

  const createCollection = async () => {
    try {
      setTheWholeProcessState('error');
      setStartedCreation(true);
      let newCompileResult = compileResult;
      let newTxReceipt = txReceipt;
      let newEtherscanPublishingHx = etherscanPublishingHx;

      if (!compilingSuccess) {
        setActiveStep((prevActiveStep) => 0);
        setCompiling(true);
        newCompileResult = await compileSmartContract(source, `${getContractName()}.sol`);
        setCompiling(false);
        if (!newCompileResult) {
          setCompilingError(true);
          return;
        }
        setCompileResult(newCompileResult);
        setCompilingSuccess(true);
      }

      if (!deployingSuccess && newCompileResult) {
        setDeploying(true);
        setActiveStep((prevActiveStep) => 1);
        const signer = library?.getSigner(account);
        if (!signer) return;
        const deployTransaction = deploySmartContract(newCompileResult, getContractName(), signer);
        const txResponseGenerator = await deployTransaction.next();
        setTxHash(txResponseGenerator?.value?.hash || '');
        const txReceiptGenerator = await deployTransaction.next();

        newTxReceipt = txReceiptGenerator.value;

        setDeploying(false);

        if (!newTxReceipt) {
          setDeployingError(true);
          return;
        }

        createContract({
          txHash: newTxReceipt.transactionHash || '',
          contractAddress: newTxReceipt.contractAddress,
          chainId: selectedChain?.chainId || 1,
          account: account || '',
          contractContent: JSON.stringify({
            sourceCode: source,
            compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
            licenseType: SPDX_LICENSE_IDENTIFIER.MIT
          })
        }).catch((err) => {
          console.log('Error posting contract:', err.response);
        });

        setContractAddress(newTxReceipt.contractAddress);
        setTxHash(newTxReceipt.transactionHash);
        setDeployingSuccess(true);
        setTxReceipt(newTxReceipt);
      }

      if (!publishingSuccess) {
        setActiveStep((prevActiveStep) => 2);
        setPublishing(true);
        newEtherscanPublishingHx = await publishSmartContract(
          selectedChain.chainId,
          getContractName(),
          newTxReceipt,
          newCompileResult
        );
        setPublishing(false);

        if (!newEtherscanPublishingHx) {
          setPublishingError(true);
          return;
        }
        setEtherscanPublishingHx(newEtherscanPublishingHx);
        setPublishingSuccess(true);
      }

      if (!verifyingSuccess && newEtherscanPublishingHx) {
        setActiveStep((prevActiveStep) => 3);
        setVerifying(true);
        const publishingStatus = await getPublishingStatus(
          newEtherscanPublishingHx,
          selectedChain.chainId
        );
        setVerifying(false);

        if (!publishingStatus) {
          setVerifyingError(true);
          return;
        }
        setVerifyingSuccess(true);
        setTheWholeProcessState('success');
      }
    } catch (e) {
      console.log('error create sm', e);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          width: 1,
          position: 'relative',
          border: (theme: any) => `solid 1px ${theme.palette.grey[500_32]}`,
          display: startedCreation ? 'block' : 'none'
        }}
      >
        <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant="body2">
          You're about to create a new collection on {selectedChain.name} and will have to confirm a
          transaction with your currently connected wallet.
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          <Step key={'key1'} onClick={() => setActiveStep(0)}>
            <StepLabel
              StepIconComponent={
                compiling
                  ? DoingIcon
                  : compilingSuccess
                  ? SuccessIcon
                  : compilingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Compile smart contract
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Your collection is build using your own smart contract therefore it needs to be
                compiled in machine language.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key2'} onClick={() => setActiveStep(1)}>
            <StepLabel
              StepIconComponent={
                deploying
                  ? DoingIcon
                  : deployingSuccess
                  ? SuccessIcon
                  : deployingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Deploy smart contract
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                You need to make a transaction on {selectedChain.name} to deploy the smart contract.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key3'} onClick={() => setActiveStep(2)}>
            <StepLabel
              StepIconComponent={
                publishing
                  ? DoingIcon
                  : publishingSuccess
                  ? SuccessIcon
                  : publishingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Publish smart contract contract on {selectedChain?.blockExplorerUrl}
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The source code of your smart contract will be published on{' '}
                {selectedChain?.blockExplorerUrl} to ensure its transparency.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key4'} onClick={() => setActiveStep(3)}>
            <StepLabel
              StepIconComponent={
                verifying
                  ? DoingIcon
                  : verifyingSuccess
                  ? SuccessIcon
                  : verifyingError
                  ? ErrorIcon
                  : undefined
              }
            >
              Verify status on {selectedChain?.blockExplorerUrl}
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Get the verification status on {selectedChain?.blockExplorerUrl}
              </Typography>
            </StepContent>
          </Step>
        </Stepper>

        <Stack spacing={1}>
          <Grid container sx={{ display: txHash ? 'flex' : 'none', mt: 5 }}>
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LightTooltip
                  title="A TxHash or transaction hash is a unique 66 character identifier that is generated whenever a transaction is executed."
                  placement="top"
                >
                  <Box>
                    <Stack justifyContent="center">
                      <Iconify icon="bi:question-circle" />
                    </Stack>
                  </Box>
                </LightTooltip>
                <Typography variant="body2">Transaction Hash:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row" alignItems="center">
                <Link
                  href={`${selectedChain.blockExplorerUrl}/tx/${txHash}`}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', color: '#1890FF' }}>
                    {txHash}
                  </Typography>
                </Link>

                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(txHash);
                  }}
                >
                  <Iconify icon="carbon:copy-file" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ display: contractAddress ? 'flex' : 'none' }}>
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LightTooltip
                  title="The transaction created a new smart contract with with its unique address. In this case the smart contract is your NFT collection."
                  placement="top"
                >
                  <Box>
                    <Stack justifyContent="center">
                      <Iconify icon="bi:question-circle" />
                    </Stack>
                  </Box>
                </LightTooltip>
                <Typography variant="body2">Contract Address:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row" alignItems="center">
                <Link
                  href={`${selectedChain.blockExplorerUrl}/address/${contractAddress}`}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', color: '#1890FF' }}>
                    {contractAddress}
                  </Typography>
                </Link>

                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(contractAddress);
                  }}
                >
                  <Iconify icon="carbon:copy-file" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ display: verifyingSuccess ? 'flex' : 'none' }}>
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LightTooltip
                  title="The source code of your smart contract (NFT collection) is uploaded on explorer to ensure its transparency."
                  placement="top"
                >
                  <Box>
                    <Stack justifyContent="center">
                      <Iconify icon="bi:question-circle" />
                    </Stack>
                  </Box>
                </LightTooltip>
                <Typography variant="body2">Verified Source Code:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row" alignItems="center">
                <Link
                  href={`${selectedChain.blockExplorerUrl}/address/${contractAddress}#code`}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', color: '#1890FF' }}>
                    {`${selectedChain.blockExplorerUrl}/address/${contractAddress}#code`}
                  </Typography>
                </Link>

                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${selectedChain.blockExplorerUrl}/address/${contractAddress}#code`
                    );
                  }}
                >
                  <Iconify icon="carbon:copy-file" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Tooltip
          title={!active ? 'Connect your wallet' : 'Please configure your smart contract'}
          disableFocusListener={active && isValid}
          disableHoverListener={active && isValid}
          disableTouchListener={active && isValid}
        >
          <Box sx={{ width: 'max-content' }}>
            <LoadingButton
              variant="contained"
              size="large"
              disabled={!active || !isValid}
              loading={isSubmitting}
              color="info"
              sx={{
                backgroundColor: '#377dff',
                px: 5,
                display: 'block'
              }}
              onClick={handleSubmit(createCollection)}
            >
              {theWholeProcessState === 'error' ? 'Try Again' : 'Deploy'}
            </LoadingButton>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
}
