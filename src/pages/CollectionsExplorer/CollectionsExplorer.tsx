import {
  Container,
  Divider,
  Grid,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { RegularArrowLeftIcon, RegularArrowRightIcon } from 'assets/icons/customIcons';
import { getListingContracts } from 'clients/crustnft-explore-api/contracts';
import { CreateContractDto } from 'clients/crustnft-explore-api/types';
import ButtonPopover from 'components/ButtonPopover';
import CollectionSumary from 'components/CollectionSumary';
import { Key, useEffect, useState } from 'react';
import Page from '../../components/Page';

export default function CollectionsExplorer() {
  const theme = useTheme();
  const [collections, setCollections] = useState<CreateContractDto[]>([]);
  const SORT_BY = ['Recently added', 'Name'];
  const [sortBy, setSortBy] = useState(SORT_BY[0]);

  useEffect(() => {
    getListingContracts(50)
      .then((res) => {
        setCollections(res?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Page title="Collection Explore">
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" gap="60px">
          <TextField placeholder="Search for a collection" sx={{ flex: 2.5 }} />
          <Stack direction="row" gap="15px" sx={{ flex: 1, alignItems: 'center' }}>
            <Typography variant="subtitle1" minWidth="60px">
              Sort by
            </Typography>
            <ButtonPopover
              displayName={sortBy}
              sx={{
                height: '100%',
                width: '100%',
                padding: '15px 18px',
                border: '2px solid',
                borderRadius: '12px',
                ...theme.typography.body1,
                ...theme.palette.textField,
                textTransform: 'none',
                justifyContent: 'flex-start',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                },
                '> .MuiButton-endIcon': {
                  position: 'absolute',
                  right: '15px'
                }
              }}
            >
              {SORT_BY.map((item, index) => (
                <MenuItem
                  key={index}
                  selected={sortBy === SORT_BY[index]}
                  onClick={() => {
                    setSortBy(item);
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </ButtonPopover>
          </Stack>
        </Stack>

        <Divider sx={{ mt: '30px', border: '1px solid', borderColor: 'grey.200' }} />

        <Grid
          container
          justifyContent="space-around"
          spacing="50px"
          sx={{ mt: '-30px', width: '100%', alignSelf: 'center', justifyContent: 'flex-start' }}
        >
          {collections.map((collection: any, index: Key | null | undefined) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <CollectionSumary collection={collection} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={7}
          boundaryCount={1}
          siblingCount={0}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: RegularArrowLeftIcon, next: RegularArrowRightIcon }}
              {...item}
            />
          )}
          sx={{
            mt: '30px',
            alignSelf: 'center',
            '& .Mui-selected.MuiPaginationItem-page': {
              backgroundColor: 'tertiary.lighter',
              color: 'tertiary.dark',
              fontWeight: 400
            }
          }}
        />
      </Container>
    </Page>
  );
}
