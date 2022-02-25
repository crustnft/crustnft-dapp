import { Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useContext } from 'react';
import { DoingIcon, ErrorIcon, SuccessIcon } from '../../../components/StepperIcons';
import { NftCreationStatusContext } from './NftForm';
export default function NftCreationStatus() {
  const {
    uploadingImage,
    uploadImageError,
    uploadImageSuccess,
    uploadingMetadata,
    uploadMetadataError,
    uploadMetadataSuccess,
    mintingNft,
    mintNftError,
    mintNftSuccess,
    txHash,
    activeStep,
    setActiveStep
  } = useContext(NftCreationStatusContext);
  const { active, account, library, onboard } = useWeb3();

  const { chain: selectedChain } = useWallet();

  // const [uploadingImage, setUploadingImage] = useState(false);
  // const [uploadImageSuccess, setUploadImageSuccess] = useState(false);
  // const [uploadImageError, setUploadImageError] = useState(false);

  // const [uploadingMetadata, setUploadingMetadata] = useState(false);
  // const [uploadMetadataSuccess, setUploadMetadataSuccess] = useState(false);
  // const [uploadMetadataError, setUploadMetadataError] = useState(false);

  // const [mintingNft, setMintingNft] = useState(false);
  // const [mintNftSuccess, setMintNftSuccess] = useState(false);
  // const [mintNftError, setMintNftError] = useState(false);
  // const [publishingRetry, setPublishingRetry] = useState(false);

  // const [txHash, setTxHash] = useState('');
  // const [contractAddress, setContractAddress] = useState('');

  return (
    <>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          width: 1,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant="body2">
          You're about to create a new NFT on ${selectedChain?.name} and will have to confirm a
          transaction with your currently connected wallet.
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          <Step key={'key1'} onClick={() => setActiveStep(0)}>
            <StepLabel
              StepIconComponent={
                uploadingImage
                  ? DoingIcon
                  : uploadImageSuccess
                  ? SuccessIcon
                  : uploadImageError
                  ? ErrorIcon
                  : undefined
              }
            >
              Upload image to Crust Network (Decentralized IPFS Pinning Service)
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Crust Network guarantees that your file will be spread across hundred of nodes. We
                are also investigating other decentralized storage solutions and will update more
                options for storing your NFT data.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key2'} onClick={() => setActiveStep(1)}>
            <StepLabel
              StepIconComponent={
                uploadingMetadata
                  ? DoingIcon
                  : uploadMetadataSuccess
                  ? SuccessIcon
                  : uploadMetadataError
                  ? ErrorIcon
                  : undefined
              }
            >
              Upload Metadata
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Metadata is a low cost off-chain solution to store additional information of your
                NFT.
              </Typography>
            </StepContent>
          </Step>
          <Step key={'key3'} onClick={() => setActiveStep(2)}>
            <StepLabel
              StepIconComponent={
                mintingNft
                  ? DoingIcon
                  : mintNftSuccess
                  ? SuccessIcon
                  : mintNftError
                  ? ErrorIcon
                  : undefined
              }
            >
              Mint NFT
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                You interact directly with the smart contract to mint the NFT.
              </Typography>
            </StepContent>
          </Step>
          {/* <Step key={'key4'} onClick={() => setActiveStep(3)}>
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
              <Typography>
                Get the verification status on {selectedChain?.blockExplorerUrl}
              </Typography>
            </StepContent>
          </Step> */}
        </Stepper>

        {/* <Stack spacing={1}>
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
        </Stack> */}
      </Paper>
    </>
  );
}
