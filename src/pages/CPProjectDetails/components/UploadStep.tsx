import { Icon } from '@iconify/react';
import { Box, Card, Grid, Link, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  id: string;
  status: string;
};
export default function UploadStep({ id, status }: Props) {
  return (
    <Stack>
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        1. Upload image & Generate unique combinations
      </Typography>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Link
            variant="body2"
            component={RouterLink}
            underline="none"
            to={`/collection-upload/${id}`}
            sx={{
              width: '100%'
            }}
          >
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
                <Icon
                  icon={
                    status === 'pending'
                      ? 'emojione-monotone:index-pointing-up'
                      : 'simple-icons:codereview'
                  }
                  height="40"
                  color="#637381"
                />

                <Box>
                  <Typography gutterBottom variant="h5">
                    {status === 'pending' ? 'Upload images' : 'Review Images'}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {status === 'pending'
                      ? 'Upload images to generate unique combinations'
                      : 'Review the images you uploaded'}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: status === 'pending' ? 'none' : 'block' }}>
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
              <Icon icon="heroicons-outline:status-online" height="40" color="#637381" />

              <Box>
                <Typography gutterBottom variant="h5">
                  Collection's generation status
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {capitalize(status)}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
