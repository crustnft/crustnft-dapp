import { Icon } from '@iconify/react';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useState } from 'react';
import { connectContract, getName, getSymbol } from 'services/smartContract/evmCompatible';
import { getRpcUrlByChainId } from 'utils/blockchainHandlers';

export default function CollectionInfo({
  contractAddr,
  chainId,
  onClick,
  ...other
}: {
  contractAddr: string;
  chainId: number;
  onClick: () => void;
  [key: string]: any;
}) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const contract = useMemo(() => {
    return connectContract(contractAddr || '', SIMPLIFIED_ERC721_ABI, getRpcUrlByChainId(chainId));
  }, [contractAddr, chainId]);

  useEffect(() => {
    getName(contract).then((name) => {
      setName(name);
    });
    getSymbol(contract).then((symbol) => {
      setSymbol(symbol);
    });
  }, []);

  return (
    <>
      <Button variant="outlined" onClick={onClick} {...other}>
        <Stack alignItems="center" sx={{ width: '100%' }}>
          <Icon icon="icon-park-outline:collection-records" width="32" />

          <Typography variant="subtitle1">{!name ? <Skeleton width={50} /> : name}</Typography>

          <Typography variant="caption">{!symbol ? <Skeleton width={50} /> : symbol}</Typography>
        </Stack>
      </Button>
    </>
  );
}
