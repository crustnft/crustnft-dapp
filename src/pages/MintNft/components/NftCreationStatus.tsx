import Iconify from 'components/Iconify';
import LightTooltip from 'components/LightTooltip';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useContext } from 'react';
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
  Typography
} from '../../../components/@c-components';
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
    setActiveStep,
    imageCid,
    metadataCid
  } = useContext(NftCreationStatusContext);
  const { active, account, library, onboard } = useWeb3();

  const { chain: selectedChain } = useWallet();

  return (
    <>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          mt: 1,
          width: 1,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
        }}
      >
        <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant="body2">
          You're about to create a new NFT on {selectedChain?.name} and will have to confirm a
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

        <Stack spacing={1}>
          <Grid container sx={{ display: imageCid ? 'flex' : 'none', mt: 5 }}>
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LightTooltip
                  title="The content identifier of the image you uploaded to IPFS"
                  placement="top"
                >
                  <Box>
                    <Stack justifyContent="center">
                      <Iconify icon="bi:question-circle" />
                    </Stack>
                  </Box>
                </LightTooltip>
                <Typography variant="body2">Image CID:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row" alignItems="center">
                <Link
                  underline="none"
                  href={`https://ipfs.io/ipfs/${imageCid}`}
                  target="_blank"
                  rel="noopener"
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', color: '#1890FF' }}>
                    {imageCid}
                  </Typography>
                </Link>

                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(imageCid);
                  }}
                >
                  <Iconify icon="carbon:copy-file" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ display: imageCid ? 'flex' : 'none' }}>
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LightTooltip
                  title="The content identifier of the metadata for your NFT"
                  placement="top"
                >
                  <Box>
                    <Stack justifyContent="center">
                      <Iconify icon="bi:question-circle" />
                    </Stack>
                  </Box>
                </LightTooltip>
                <Typography variant="body2">Metadata CID:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack direction="row" alignItems="center">
                <Link
                  href={`https://ipfs.io/ipfs/${metadataCid}`}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', color: '#1890FF' }}>
                    {metadataCid}
                  </Typography>
                </Link>

                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(metadataCid);
                  }}
                >
                  <Iconify icon="carbon:copy-file" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ display: txHash ? 'flex' : 'none' }}>
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
        </Stack>
      </Paper>
    </>
  );
}
