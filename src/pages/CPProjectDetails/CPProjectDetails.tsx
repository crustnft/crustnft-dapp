import { Icon } from '@iconify/react';
import { Box, Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import DeployCollection from './components/DeployCollection';
export default function CPProjectDetails() {
  const { id } = useParams();
  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg" sx={{ mt: { lg: -3 } }}>
        <HeaderBreadcrumbs
          heading="Dashboard"
          links={[{ name: 'Project Name', href: '#/projects-dashboard' }]}
        />
        <Card sx={{ p: 3 }}>
          <Stack spacing={4}>
            <Stack>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                1. Upload image & Generate unique combinations
              </Typography>
              <Link
                variant="body2"
                component={RouterLink}
                underline="none"
                to={`/project-upload/${id}`}
                sx={{
                  lineHeight: 2,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.primary',
                  '& > div': { display: 'inherit' }
                }}
              >
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Card
                      sx={{
                        p: 3,
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: '#F4F6F8',
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
                          icon="emojione-monotone:index-pointing-up"
                          height="40"
                          color="#637381"
                        />

                        <Box>
                          <Typography gutterBottom variant="h5">
                            Upload images
                          </Typography>

                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Upload images to generate unique combinations
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Link>
            </Stack>

            <DeployCollection />

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
                        backgroundColor: '#F4F6F8',
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
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
