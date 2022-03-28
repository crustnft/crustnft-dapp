import { Button, Card, Divider, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { getContractByTxHash, publishCollection } from 'clients/crustnft-explore-api/contracts';
import { cryptopunksABI } from 'constants/cryptopunksABI';
import { BigNumber } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { capitalize } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { connectRWContract } from 'services/smartContract/evmCompatible';
import { getChainByChainId } from 'utils/blockchainHandlers';

export default function ConfigDeployedSmartContract() {
  const { accessToken } = useAuth();
  const { account, library } = useWeb3();

  const [publishChecked, setPublishChecked] = useState(true);
  const [contractAddress, setContractAddress] = useState('');
  const [chainId, setChainId] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('ETH');

  const [paused, setPaused] = useState(false);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const txHash = '0x14d62c69fd11dd9742f3b76c28306b5764f5d1465354052ed90ea8cf083db362';

  useEffect(() => {
    getContractByTxHash(txHash).then((res) => {
      setPublishChecked(res.published);
      setContractAddress(res.contractAddress);
      setChainId(res.chainId);
    });
  }, []);

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
      contract.maxMintAmountPerTx().then((maxMintAmountPerTx: number) => {
        setMaxMintAmountPerTx(maxMintAmountPerTx);
      });
      contract.cost().then((tokenPrice: BigNumber) => {
        setTokenPrice(tokenPrice.toNumber());
      });
      contract.whitelistMintEnabled().then((isWhitelistMintEnabled: boolean) => {
        setIsWhitelistMintEnabled(isWhitelistMintEnabled);
      });
      contract.revealed().then((revealed: boolean) => {
        setRevealed(revealed);
      });
    }
  }, [contract]);

  const handlePublishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishChecked(event.target.checked);
    publishCollection(accessToken, txHash, event.target.checked);
  };

  return (
    <>
      <Card sx={{ p: 3, m: -3 }}>
        <Paper
          sx={{
            p: 3,
            mb: 2,
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
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
                defaultValue={tokenPrice}
              />
              <TextField
                size="small"
                label="Max Mint Amount Per Transaction"
                defaultValue={maxMintAmountPerTx}
              />

              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="info" size="small">
                  Open Whitelist
                </Button>
                <Button variant="contained" color="warning" size="small">
                  Close Whitelist
                </Button>
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
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                0.05 {currencySymbol}
              </Typography>
            </Stack>

            <Stack sx={{ mt: 1 }} spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Setup Public Sale
              </Typography>
              <TextField
                size="small"
                label={`Cost (${currencySymbol})`}
                defaultValue={tokenPrice}
              />
              <TextField
                size="small"
                label="Max Mint Amount Per Transaction"
                defaultValue={maxMintAmountPerTx}
              />

              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="info" size="small">
                  Open Public Sale
                </Button>
                <Button variant="contained" color="warning" size="small">
                  Close Public Sale
                </Button>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="overline" sx={{ color: 'text.primary', mb: 1 }}>
              Reveal the token
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Current Status
              </Typography>

              <Typography variant="subtitle2">{revealed ? 'Revealed' : 'Hidden'}</Typography>
            </Stack>
            <Stack direction="row" sx={{ mt: 1 }} spacing={1}>
              <Button variant="contained" color="info" size="small">
                Reveal
              </Button>
              <Button variant="contained" color="warning" size="small">
                Hide
              </Button>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Publish on crustnft
              </Typography>

              <Switch size="small" checked={publishChecked} onChange={handlePublishChange} />
            </Stack>
          </Stack>
        </Paper>
      </Card>
    </>
  );
}
