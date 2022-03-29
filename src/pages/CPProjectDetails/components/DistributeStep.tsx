import { Icon } from '@iconify/react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

export default function DistributeStep() {
  return (
    <Stack>
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        3. NFTs Distribution
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Connect with trading platform and start selling your NFTs
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 3,
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'background.neutral',
                border: '1px solid #15B2E5'
              }
            }}
          >
            <Stack
              spacing={2}
              alignItems="center"
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                width: 1,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Icon icon="ci:share-outline" height="40" color="#637381" />

              <Box>
                <Typography gutterBottom variant="h5">
                  Distribute NFTs
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Distribute NFTs to your users
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
