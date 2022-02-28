import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import Iconify from '../../../components/Iconify';
import { AssetAndOwnerType } from '../AssetViewer.types';
import Property from './/Property';
import CircularBoost from './CircularBoost';
import LevelProgress from './LevelProgress';
import StatNumber from './StatNumber';

const ipfsGateway = 'https://gw.crustapps.net';

type AssetAttributesProps = {
  assetAndOwner: AssetAndOwnerType;
};

export default function AssetAttributes({ assetAndOwner }: AssetAttributesProps) {
  useEffect(() => {
    if (assetAndOwner.attributes.length) {
      for (let i = 0; i < assetAndOwner.attributes.length; i++) {
        if (
          assetAndOwner.attributes[i].hasOwnProperty('trait_type') &&
          assetAndOwner.attributes[i].hasOwnProperty('value')
        ) {
          console.log(typeof assetAndOwner.attributes[i].trait_type);
        }
      }
    }
  }, [assetAndOwner.attributes]);
  const properties: any = [];
  const boosts: any = [];
  const stats: any = [];
  const levels: any = [];
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle1" sx={{ display: 'block' }}>
            Name of item
          </Typography>
          <Typography variant="caption">A description</Typography>
          <Box sx={{ height: 5 }} />
          <Typography variant="caption">A description</Typography>
        </Stack>

        <Stack spacing={1}>
          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="bxs:tag" rotate={2} />
                  <Typography variant="subtitle1">Properties</Typography>
                </Stack>
                <Typography variant="caption">Textual traits that show up as rectangles</Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                {properties.map((property: any, index: any) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    <Property {...property} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="bxs:star" />
                  <Typography variant="subtitle1">Levels</Typography>
                </Stack>
                <Typography variant="caption">
                  Numerical traits that show as a progress bar
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} sx={{ mt: 1 }}>
              {levels.map((level: any, index: any) => (
                <LevelProgress key={level.levelType + index} {...level} />
              ))}
            </Stack>
          </Stack>

          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ion:stats-chart" />
                  <Typography variant="subtitle1">Stats</Typography>
                </Stack>
                <Typography variant="caption">
                  Numerical traits that just show as numbers
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                {stats.map((stat: any, index: any) => (
                  <Grid key={stat.statType + index} item xs={6}>
                    <StatNumber {...stat} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ic:baseline-flash-on" />
                  <Typography variant="subtitle1">Boosts</Typography>
                </Stack>
                <Typography variant="caption">
                  Number or percentage boosts that show up as a circular boost
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {boosts.map((boost: any, index: any) => (
                <CircularBoost key={boost.boostType + index} {...boost} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
