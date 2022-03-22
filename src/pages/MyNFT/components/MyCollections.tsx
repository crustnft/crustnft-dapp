import { Stack, Typography } from '@mui/material';
import { getContractsByAccount } from 'clients/crustnft-explore-api/contracts';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import CollectionSlider from './CollectionSlider';

export default function MyCollections() {
  const { account } = useWeb3();
  const [collections, setCollections] = useState([]);
  const [nbOfContractCreated, setNbOfContractCreated] = useState(0);

  useEffect(() => {
    if (account) {
      getContractsByAccount(10, account.toLowerCase()).then((res) => {
        setCollections(res.data?.data);
        setNbOfContractCreated(res.data?.data?.length || 0);
      });
    }
  }, [account]);

  return (
    <Stack spacing={3} sx={{ mt: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" spacing={1} sx={{ color: 'text.secondary' }} alignItems="baseline">
          <Typography variant="h3">Your collections</Typography>
          <Typography variant="subtitle1">({nbOfContractCreated})</Typography>
        </Stack>
      </Stack>
      {collections.map((collection: any) => (
        <CollectionSlider
          key={collection.txHash}
          contractAddr={collection.contractAddress}
          chainId={collection.chainId}
        />
      ))}
    </Stack>
  );
}
