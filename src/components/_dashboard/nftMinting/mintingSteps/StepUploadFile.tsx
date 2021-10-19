import { Box, FormControlLabel, Stack, SvgIcon, Switch, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import UploadMultiFile from '../UploadMultiFile';
import { create } from 'ipfs-http-client';

import {
  IPFS_GATEWAY_W3AUTH,
  IPFS_PINNING_SERVICE_W3AUTH,
  CRUST_WALLET_WIKI,
  METAMASK_SELECT_POLYGON_URL,
  INSTALL_METAMASK_URL
} from '../../../../assets/COMMON_VARIABLES';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import { ethers } from 'ethers';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import { VariantType } from 'notistack';
import { MintingContext } from './minting.context';

const ipfsGateway = IPFS_GATEWAY_W3AUTH[0];
const ipfsPinningService = IPFS_PINNING_SERVICE_W3AUTH[0];

export type FileInfoType = {
  name: string;
  cid: string;
  size: number;
};

type StepUploadFileProps = {
  onSnackbarAction: (color: VariantType, text: string, url?: string | undefined) => void;
};

export const pinW3Crust = async (authHeader: string, cid: string, name: string) => {
  await axios.post(
    ipfsPinningService + '/pins',
    {
      cid,
      name
    },
    {
      headers: {
        authorization: 'Bearer ' + authHeader,
        'Content-Type': 'application/json'
      }
    }
  );
};

function StepUploadFile({ onSnackbarAction }: StepUploadFileProps) {
  const { setSrcImage, stepOneNotDone } = useContext(MintingContext);
  const [preview, setPreview] = useState(false);
  // const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedCid, setUploadedCid] = useState<FileInfoType>({ cid: '', name: '', size: 0 });
  const [isFileUploading, setFileUploading] = useState(false);
  const { setStepOneNotDone } = useContext(MintingContext);

  const loadImg = () => {
    const reader = new FileReader();

    reader.onload = async () => {
      setSrcImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  useEffect(() => {
    if (files[0]) {
      loadImg();
    }
  }, [files[0]]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles.map((file: File) => file));
    },
    [setFiles]
  );

  const handleRemove = (file: File | string) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  function uploadFileW3GatewayPromise(authHeader: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setFileUploading(true);
      const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
          authorization: 'Basic ' + authHeader
        }
      });
      const reader = new FileReader();
      reader.onabort = () => reject('file reading was aborted');
      reader.onerror = () => reject('file reading has failed');
      reader.onload = async () => {
        const added = await ipfs.add(reader.result as ArrayBuffer);
        setUploadedCid({ cid: added.cid.toV0().toString(), size: added.size, name: files[0].name });
        setFileUploading(false);
        setStepOneNotDone(false);
        resolve({ cid: added.cid.toV0().toString(), name: files[0].name });
      };
      reader.readAsArrayBuffer(files[0]);
    });
  }

  const uploadFileMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider && provider.isMetaMask) {
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      if (parseInt(chainId, 16) === 137) {
        await provider.request({ method: 'eth_requestAccounts' });

        const providerEthers = new ethers.providers.Web3Provider(provider);

        const signer = providerEthers.getSigner();
        const addr = await signer.getAddress();
        const signature = await signer.signMessage(addr);

        const authHeader = Buffer.from(`pol-${addr}:${signature}`).toString('base64');

        uploadFileW3GatewayPromise(authHeader)
          .then((uploadedFileInfo) => {
            pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        onSnackbarAction(
          'warning',
          'Please select Polygon Network from Metamask',
          METAMASK_SELECT_POLYGON_URL
        );
      }
    } else {
      onSnackbarAction('warning', 'Please install Metamask', INSTALL_METAMASK_URL);
    }
  };

  const uploadFileCrust = async () => {
    const extensions = await web3Enable('NFT Dapp');
    if (extensions.length === 0) {
      onSnackbarAction('warning', 'Please install Crust Wallet', CRUST_WALLET_WIKI);
      return;
    }
    const allAccounts: InjectedAccountWithMeta[] = await web3Accounts();

    let crustAccountIndex = parseInt(localStorage.getItem('selectedAccountCrustIndex') || '0', 10);

    crustAccountIndex =
      crustAccountIndex < allAccounts.length && crustAccountIndex >= 0 ? crustAccountIndex : 0;

    const account = allAccounts[crustAccountIndex];

    const injector = await web3FromSource(account.meta.source);

    const signRaw = injector?.signer?.signRaw;

    let signature = '';
    if (!!signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      signature = (
        await signRaw({
          address: account.address,
          data: stringToHex(account.address),
          type: 'bytes'
        })
      ).signature;
    }
    const authHeader = Buffer.from(`sub-${account.address}:${signature}`).toString('base64');

    uploadFileW3GatewayPromise(authHeader)
      .then((uploadedFileInfo) => {
        pinW3Crust(authHeader, uploadedFileInfo.cid, uploadedFileInfo.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box sx={{ display: 'flex', mt: 3, mb: 1 }}>
        <Typography variant="h6">Upload file to Crust Network</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />
          }
          label="Show Preview"
        />
      </Box>
      <UploadMultiFile
        showPreview={preview}
        files={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemove}
        onUploadFile={{ uploadFileMetamask, uploadFileCrust }}
        isFileUploading={isFileUploading}
        stepOneNotDone={!stepOneNotDone}
      />

      {uploadedCid.cid !== '' && (
        <Box
          sx={{
            my: 1,
            px: 2,
            py: 1,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: '#C8FACD'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SvgIcon color="action">
              <Icon icon="teenyicons:certificate-outline" color="black" />
            </SvgIcon>
            <Stack direction="column">
              <Typography variant="subtitle2">Uploaded successfully to Crust Network</Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                CID: {uploadedCid.cid}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
      {/* <UploadSingleFile file={file} onDrop={handleDropSingleFile} /> */}
    </>
  );
}

export default StepUploadFile;