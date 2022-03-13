import { Icon } from '@iconify/react';
import { Box, Button, Card, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function EmptyCollectionBox({
  contractAddr,
  chainId,
  totalSupply,
  collectionTitle,
  chainName
}: {
  contractAddr: string;
  chainId: number;
  totalSupply: number;
  collectionTitle: string;
  chainName: String;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.collectionSlider,
        borderRadius: '32px',
        border: '1px solid grey'
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack sx={{ ml: 4, my: 2 }} width="50%">
          <Link href={`#/collection/${chainName}/${contractAddr}/1`}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h4">{collectionTitle}</Typography>
              <Typography variant="subtitle2">({totalSupply})</Typography>
            </Stack>
          </Link>
        </Stack>

        <Stack sx={{ mt: 2 }} justifyContent="flex-end" width="50%" direction="row">
          <Button
            size="small"
            variant="contained"
            color="warning"
            sx={{ m: 1, px: 3, py: 1, borderRadius: '26px', width: '110px' }}
            href={`#/mint-nft/${chainName}/${contractAddr}`}
          >
            Mint NFT
          </Button>
        </Stack>
      </Stack>
      <Stack justifyContent="center" direction="column">
        <Link href={`#/mint-nft/${chainName}/${contractAddr}`}>
          <Card
            sx={{
              width: { lg: '230px', xs: '100px' },
              height: { lg: '300px', xs: '130px' },
              bgcolor: 'transparent',
              transition: 'all .2s ease-in-out',
              boxShadow: 'none',
              margin: '10px',
              opacity: 0.28,
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23333' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              borderRadius: '18px',
              ml: 3,
              mb: 2
            }}
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={1}
              sx={{ height: '100%' }}
            >
              <Icon width="53px" height="53px" icon="akar-icons:plus" />
              <Stack alignItems="center" justifyContent="center">
                <Typography variant="subtitle1">Your collection is empty,</Typography>
                <Typography variant="subtitle1">add it now!</Typography>
              </Stack>
            </Stack>
          </Card>
        </Link>
      </Stack>
    </Box>
  );
}
