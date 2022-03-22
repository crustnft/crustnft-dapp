import { Icon } from '@iconify/react';
import { Box, Card, Dialog, DialogContent, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CreateCollection from './CreateCollection';

export default function DeployCollection() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          2. Deploy smart contract
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          You have to generate the images and metadata from step 1 first, otherwise you need to
          upload yourself the images and metadata on IPFS
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
              onClick={() => setOpen(true)}
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
                <Icon icon="carbon:deployment-pattern" height="40" color="#637381" />

                <Box>
                  <Typography gutterBottom variant="h5">
                    Deploy smart contract
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Select your preferred network and deploy your smart contract
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        scroll="paper"
      >
        <DialogContent dividers={true}>
          <Stack sx={{ p: 1, pb: 2 }} spacing={1}>
            <Typography variant="h5">Add Levels</Typography>
            <Typography variant="body2">
              Levels show up underneath your item, are clickable, and can be filtered in your
              collection's sidebar.
            </Typography>
          </Stack>
          <CreateCollection />
        </DialogContent>
      </Dialog>
    </>
  );
}
