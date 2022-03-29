import { LoadingButton } from '@mui/lab';
import { Card, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { getContractByTxHash } from 'clients/crustnft-explore-api/contracts';
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { BigNumber, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { capitalize } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import { getChainByChainId } from 'utils/blockchainHandlers';

export default function ConfigDeployedSmartContract({
  txHash,
  metadataCID
}: {
  txHash: string;
  metadataCID: string;
}) {
  const { accessToken } = useAuth();
  const { account, library } = useWeb3();

  const [contractAddress, setContractAddress] = useState('');
  const [chainId, setChainId] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('ETH');

  const [paused, setPaused] = useState(false);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const [inputWhitelistMaxMintAmountPerTx, setInputWhitelistMaxMintAmountPerTx] = useState(0);
  const [inputWhitelistTokenPrice, setInputWhitelistTokenPrice] = useState(0);
  const [inputPublicSaleMaxMintAmountPerTx, setInputPublicSaleMaxMintAmountPerTx] = useState(0);
  const [inputPublicSaleTokenPrice, setInputPublicSaleTokenPrice] = useState(0);

  const [openWhitelistPending, setOpenWhitelistPending] = useState(false);
  const [closeWhitelistPending, setCloseWhitelistPending] = useState(false);
  const [openPublicSalePending, setOpenPublicSalePending] = useState(false);
  const [closePublicSalePending, setClosePublicSalePending] = useState(false);
  const [revealPending, setRevealPending] = useState(false);
  const [hidePending, setHidePending] = useState(false);

  useEffect(() => {
    if (txHash) {
      getContractByTxHash(txHash).then((res) => {
        setContractAddress(res.contractAddress);
        setChainId(res.chainId);
      });
    }
  }, [txHash]);

  useEffect(() => {
    if (chainId) {
      const chain = getChainByChainId(chainId);
      setCurrencySymbol(chain?.currencySymbol || 'ETH');
    }
  }, [chainId]);

  const contract = useMemo(() => {
    if (contractAddress && library && account) {
      const signer = library?.getSigner(account);
      if (!signer) return;
      return connectRWContract(contractAddress, cryptopunksABI, signer);
    }
  }, [contractAddress, library, account]);

  useEffect(() => {
    if (contract) {
      contract.paused().then((paused: boolean) => {
        setPaused(paused);
      });
      contract.maxMintAmountPerTx().then((maxMintAmountPerTx: BigNumber) => {
        console.log('maxMintAmountPerTx', maxMintAmountPerTx.toNumber());
        setMaxMintAmountPerTx(maxMintAmountPerTx.toNumber());
      });
      contract.cost().then((tokenPrice: BigNumber) => {
        setTokenPrice(parseFloat(utils.formatEther(tokenPrice)));
      });
      contract.whitelistMintEnabled().then((isWhitelistMintEnabled: boolean) => {
        setIsWhitelistMintEnabled(isWhitelistMintEnabled);
      });
      contract.revealed().then((revealed: boolean) => {
        setRevealed(revealed);
      });
    }
  }, [contract]);

  useEffect(() => {
    setInputWhitelistTokenPrice(tokenPrice);
    setInputPublicSaleTokenPrice(tokenPrice);
  }, [tokenPrice]);

  useEffect(() => {
    setInputWhitelistMaxMintAmountPerTx(maxMintAmountPerTx);
    setInputPublicSaleMaxMintAmountPerTx(maxMintAmountPerTx);
  }, [maxMintAmountPerTx]);

  const handelOpenWhitelist = async () => {
    if (!contract) return;

    setOpenWhitelistPending(true);

    if (!(await contract.whitelistMintEnabled())) {
      await (await contract.setWhitelistMintEnabled(true)).wait();
    }

    if (inputWhitelistTokenPrice !== tokenPrice) {
      await (await contract.setCost(utils.parseEther(inputWhitelistTokenPrice.toString()))).wait();
    }

    if (inputWhitelistMaxMintAmountPerTx !== maxMintAmountPerTx) {
      await (await contract.setMaxMintAmountPerTx(inputWhitelistMaxMintAmountPerTx)).wait();
    }

    setOpenWhitelistPending(false);
  };

  const handleCloseWhitelist = async () => {
    if (!contract) return;

    setCloseWhitelistPending(true);

    if (await contract.whitelistMintEnabled()) {
      await (await contract.setWhitelistMintEnabled(false)).wait();
    }

    setCloseWhitelistPending(false);
  };

  const handleOpenPublicSale = async () => {
    if (!contract) return;

    setOpenPublicSalePending(true);

    if (await contract.whitelistMintEnabled()) {
      await (await contract.setWhitelistMintEnabled(false)).wait();
    }

    if (inputPublicSaleTokenPrice !== tokenPrice) {
      await (await contract.setCost(utils.parseEther(inputPublicSaleTokenPrice.toString()))).wait();
    }

    if (inputPublicSaleMaxMintAmountPerTx !== maxMintAmountPerTx) {
      await (await contract.setMaxMintAmountPerTx(inputPublicSaleMaxMintAmountPerTx)).wait();
    }

    if (await contract.paused()) {
      await (await contract.setPaused(false)).wait();
    }

    setOpenPublicSalePending(false);
  };

  const handleClosePublicSale = async () => {
    if (!contract) return;

    setClosePublicSalePending(true);

    if (!(await contract.paused())) {
      await (await contract.setPaused(true)).wait();
    }

    setClosePublicSalePending(false);
  };

  const handleReveal = async () => {
    if (!contract) return;

    setRevealPending(true);

    if ((await contract.uriPrefix()) !== `ipfs://${metadataCID}/`) {
      await (await contract.setUriPrefix(`ipfs://${metadataCID}/`)).wait();
    }

    if (!(await contract.revealed())) {
      await (await contract.setRevealed(true)).wait();
    }

    setRevealPending(false);
  };

  return (
    <>
      <Card sx={{ p: 3, m: -3 }}>
        <Paper
          sx={{
            p: 3,
            width: 1,
            position: 'relative',
            border: (theme: any) => `solid 1px ${theme.palette.grey[500_32]}`
          }}
        >
          <Stack>
            <Typography variant="overline" sx={{ color: 'text.primary', mb: 1 }}>
              Whitelist
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Whitelist enabled
              </Typography>

              <Typography variant="subtitle2">
                {capitalize(isWhitelistMintEnabled.toString())}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Cost
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {tokenPrice} {currencySymbol}
              </Typography>
            </Stack>

            <Stack sx={{ mt: 1 }} spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Setup Whitelist
              </Typography>
              <TextField
                size="small"
                label={`Cost (${currencySymbol})`}
                type="number"
                value={inputWhitelistTokenPrice}
                onChange={(e: any) => setInputWhitelistTokenPrice(parseFloat(e.target.value))}
              />
              <TextField
                type="number"
                size="small"
                label="Max Mint Amount Per Transaction"
                value={inputWhitelistMaxMintAmountPerTx}
                onChange={(e: any) =>
                  setInputWhitelistMaxMintAmountPerTx(parseFloat(e.target.value))
                }
              />

              <Stack direction="row" spacing={1}>
                <LoadingButton
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={handelOpenWhitelist}
                  loading={openWhitelistPending}
                >
                  Open Whitelist
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="warning"
                  size="small"
                  loading={closeWhitelistPending}
                  onClick={handleCloseWhitelist}
                >
                  Close Whitelist
                </LoadingButton>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline" sx={{ color: 'text.primary' }}>
              Open sale
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Open sale enabled
              </Typography>
              <Typography variant="subtitle2">{capitalize((!paused).toString())}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Cost
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {tokenPrice} {currencySymbol}
              </Typography>
            </Stack>

            <Stack sx={{ mt: 1 }} spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Setup Public Sale
              </Typography>
              <TextField
                size="small"
                label={`Cost (${currencySymbol})`}
                value={inputPublicSaleTokenPrice}
                type="number"
                onChange={(e: any) => setInputPublicSaleTokenPrice(parseFloat(e.target.value))}
              />
              <TextField
                size="small"
                label="Max Mint Amount Per Transaction"
                value={inputPublicSaleMaxMintAmountPerTx}
                type="number"
                onChange={(e: any) =>
                  setInputPublicSaleMaxMintAmountPerTx(parseFloat(e.target.value))
                }
              />

              <Stack direction="row" spacing={1}>
                <LoadingButton
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={handleOpenPublicSale}
                  loading={openPublicSalePending}
                >
                  Open Public Sale
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={handleClosePublicSale}
                  loading={closePublicSalePending}
                >
                  Close Public Sale
                </LoadingButton>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline" sx={{ color: 'text.primary', mb: 1 }}>
              Reveal the NFT
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Current Status
              </Typography>

              <Typography variant="subtitle2">{revealed ? 'Revealed' : 'Hidden'}</Typography>
            </Stack>
            <Stack direction="row" sx={{ mt: 1 }} spacing={1}>
              <LoadingButton
                variant="contained"
                color="info"
                size="small"
                onClick={handleReveal}
                loading={revealPending}
              >
                Reveal
              </LoadingButton>
              <LoadingButton variant="contained" color="warning" size="small">
                Hide
              </LoadingButton>
            </Stack>
          </Stack>
        </Paper>
      </Card>
    </>
  );
}
