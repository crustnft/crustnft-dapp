import { Link, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Iconify from 'components/Iconify';
import useWeb3 from 'hooks/useWeb3';
import CollectionSlider from './CollectionSlider';

export default function MyCollections() {
  const { active, account } = useWeb3();

  return (
    <Stack spacing={3} sx={{ mt: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack>
          <Avatar>
            <Iconify icon="simple-icons:azuredataexplorer" />
          </Avatar>
        </Stack>
        <Stack>
          <Typography variant="h5" sx={{ color: '#637381' }}>
            COLLECTIONS CREATED ON CRUSTNFT
          </Typography>

          <Link underline="none" href="#/collection-explore" target="_blank" rel="noopener">
            <Typography sx={{ color: '#919EAB' }}>Explore all</Typography>
          </Link>
        </Stack>
      </Stack>
      <CollectionSlider contractAddr="0x763A8A60bf6840a1cdb3d0E1A49893B143539bb9" chainId={4} />
      <CollectionSlider contractAddr="0x572c4dDcE57cdd7201122a8aC6b92fF18dEF2079" chainId={4} />
      <CollectionSlider contractAddr="0x75b7933b3be098e39cca412de5cfbf64f22cc59b" chainId={4} />
    </Stack>
  );
}
