import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from '../../../components/Iconify';
import {
  AssetAndOwnerType,
  BoostProps,
  LevelProps,
  PropertyProps,
  StatProps
} from '../AssetViewer.types';
import Property from './/Property';
import CircularBoost from './CircularBoost';
import LevelProgress from './LevelProgress';
import StatNumber from './StatNumber';

type AssetAttributesProps = {
  assetAndOwner: AssetAndOwnerType;
};

export default function AssetAttributes({ assetAndOwner }: AssetAttributesProps) {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [levels, setLevels] = useState<LevelProps[]>([]);
  const [stats, setStats] = useState<StatProps[]>([]);
  const [boosts, setBoosts] = useState<BoostProps[]>([]);
  useEffect(() => {
    setProperties([]);
    setLevels([]);
    setStats([]);
    setBoosts([]);
    if (assetAndOwner.attributes.length) {
      for (let i = 0; i < assetAndOwner.attributes.length; i++) {
        if (
          assetAndOwner.attributes[i].hasOwnProperty('trait_type') &&
          assetAndOwner.attributes[i].hasOwnProperty('value')
        ) {
          if (typeof assetAndOwner.attributes[i].trait_type === 'string') {
            if (typeof assetAndOwner.attributes[i].value === 'string') {
              console.log('set properties');
              setProperties((prev) => [
                ...prev,
                {
                  propType: assetAndOwner.attributes[i].trait_type as string,
                  name: assetAndOwner.attributes[i].value as string
                }
              ]);
            } else if (typeof assetAndOwner.attributes[i].value === 'number') {
              if (assetAndOwner.attributes[i].hasOwnProperty('display_type')) {
                switch (assetAndOwner.attributes[i].display_type) {
                  case 'number':
                    setStats((prev) => [
                      ...prev,
                      {
                        statType: assetAndOwner.attributes[i].trait_type as string,
                        value: assetAndOwner.attributes[i].value as number,
                        max: assetAndOwner.attributes[i].value as number
                      }
                    ]);
                    break;
                  case 'boost_percentage':
                  case 'boost_number':
                    setBoosts((prev) => [
                      ...prev,
                      {
                        boostType: assetAndOwner.attributes[i].trait_type as string,
                        displayType: assetAndOwner.attributes[i].display_type,
                        value: assetAndOwner.attributes[i].value as number
                      }
                    ]);
                    break;
                  default:
                    break;
                }
              } else {
                setLevels((prev) => [
                  ...prev,
                  {
                    levelType: assetAndOwner.attributes[i].trait_type as string,
                    value: assetAndOwner.attributes[i].value as number,
                    max: assetAndOwner.attributes[i].value as number
                  }
                ]);
              }
            }
          }
        }
      }
    }
  }, [assetAndOwner.attributes]);

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography variant="h2" sx={{ display: 'block' }}>
          {assetAndOwner.name}
        </Typography>
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          {assetAndOwner.description}
        </Typography>
        <Box sx={{ height: 5 }} />
      </Stack>

      <Stack spacing={3}>
        <Stack>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="bxs:tag" rotate={2} />
                  <Typography variant="subtitle1">Properties</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Textual traits that show up as rectangles
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                {properties.map((property: any, index: any) => (
                  <Grid key={index} item xs={6} sm={4}>
                    <Property {...property} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Card>
        </Stack>

        <Stack>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="bxs:star" />
                  <Typography variant="subtitle1">Levels</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Numerical traits that show as a progress bar
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} sx={{ mt: 1 }}>
              {levels.map((level: any, index: any) => (
                <LevelProgress key={level.levelType + index} {...level} />
              ))}
            </Stack>
          </Card>
        </Stack>

        <Stack>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ion:stats-chart" />
                  <Typography variant="subtitle1">Stats</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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
          </Card>
        </Stack>

        <Stack>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="ic:baseline-flash-on" />
                  <Typography variant="subtitle1">Boosts</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Number or percentage boosts that show up as a circular boost
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {boosts.map((boost: any, index: any) => (
                <CircularBoost key={boost.boostType + index} {...boost} />
              ))}
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
}
