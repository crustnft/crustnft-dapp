import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { CloseSquareIcon, QuestionIcon } from 'assets/icons/customIcons';
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
import useAuth from 'hooks/useAuth';
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
import ButtonClickOnRender from './ButtonClickOnRender';

const useStyles = makeStyles({
  root: {
    '& .MuiStepLabel-label': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }
});

export default function DeploySmartContract({
  open,
  onClose: handleClose,
  startedCreation,
  setStartedCreation,
  onCloseAll: handleCloseAll
}: {
  open: boolean;
  onClose: () => void;
  startedCreation: boolean;
  setStartedCreation: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseAll: () => void;
}) {
  const { accessToken } = useAuth();
  const classes = useStyles();

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
    'notstarted' | 'started' | 'success' | 'error'
  >('notstarted');

  const createCollection = async () => {
    try {
      setTheWholeProcessState('started');
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

        createContract(accessToken, {
          id: newTxReceipt.transactionHash || '',
          contractAddress: newTxReceipt.contractAddress,
          chainId: selectedChain?.chainId || 1,
          contractContent: JSON.stringify({
            sourceCode: source,
            compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
            licenseType: SPDX_LICENSE_IDENTIFIER.MIT
          }),
          published: true,
          collectionType: 'expandable'
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
      setTheWholeProcessState('error');
      console.log('error create sm', e);
    }
  };

  const StepInfo = ({ title }: { title: string }) => (
    <Tooltip title={title}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '8px'
        }}
      >
        <QuestionIcon width={20} height={20} />
      </Box>
    </Tooltip>
  );

  return (
    <Dialog open={open} onClose={deployingSuccess ? handleCloseAll : handleClose}>
      <Card
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
            Deploy status
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseSquareIcon />
          </IconButton>
        </Stack>
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          <Step key={'key1'} onClick={() => setActiveStep(0)} completed={compilingSuccess}>
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
              className={classes.root}
            >
              <Typography variant="h6">Compile smart contract</Typography>
              <StepInfo
                title="Your collection is build using your own smart contract therefore it needs to be
                compiled in machine language."
              />
            </StepLabel>
          </Step>
          <Step key={'key2'} onClick={() => setActiveStep(1)} completed={deployingSuccess}>
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
              className={classes.root}
            >
              <Typography variant="h6">Deploy smart contract</Typography>
              <StepInfo title="You need to make a transaction on {selectedChain.name} to deploy the smart contract." />
            </StepLabel>
          </Step>
          <Step key={'key3'} onClick={() => setActiveStep(2)} completed={publishingSuccess}>
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
              className={classes.root}
            >
              <Typography variant="h6">Publish smart contract contract</Typography>
              <StepInfo
                title={`The source code of your smart contract will be published on ${selectedChain?.blockExplorerUrl} to ensure its transparency.`}
              />
            </StepLabel>
          </Step>
          <Step key={'key4'} onClick={() => setActiveStep(3)} completed={verifyingSuccess}>
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
              className={classes.root}
            >
              <Typography variant="h6">Verify status</Typography>
              <StepInfo
                title={`Get the verification status on {selectedChain?.blockExplorerUrl}.`}
              />
            </StepLabel>
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

        <Box sx={{ my: 2 }}>
          <Tooltip
            title={!active ? 'Connect your wallet' : 'Please configure your smart contract'}
            disableFocusListener={active && isValid}
            disableHoverListener={active && isValid}
            disableTouchListener={active && isValid}
          >
            <Box
              sx={{
                width: '100%',
                display: theWholeProcessState === 'error' ? 'flex' : 'none',
                justifyContent: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <ButtonClickOnRender
                disabled={!active || !isValid}
                loading={isSubmitting}
                onClick={handleSubmit(createCollection)}
              />
            </Box>
          </Tooltip>
        </Box>
        {verifyingSuccess && (
          <Stack direction="row" width="100%" justifyContent="center">
            <Button
              variant="contained"
              sx={{ py: '11px', width: '50%', maxWidth: '230px' }}
              onClick={() => {
                handleCloseAll();
              }}
            >
              <Typography variant="buttonLarge" color="grey.0" sx={{ textTransform: 'none' }}>
                Mint now!
              </Typography>
            </Button>
          </Stack>
        )}
      </Card>
    </Dialog>
  );
}
