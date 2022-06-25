import { Box, Stack, styled, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { APP_BAR_MAX_WIDTH } from 'layouts/dashboard/DashboardNavbar';
import { Key } from 'react';
import { COLLECTION_ITEM } from '../../constants';
import SectionHeader from '../SectionHeader';

const columns: GridColDef[] = [
  {
    field: 'preview',
    headerName: 'PREVIEW',
    width: 100,
    renderCell: (params) => <Box component="img" src={params.value} />,
    sortable: false
  },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 70,
    renderCell: (params) => <Box component="img" src={params.value} />,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 290,
    renderCell: (params) => (
      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'network',
    headerName: 'NETWORK',
    width: 160,
    renderCell: (params) => (
      <Typography variant="body1" color="text.primary">
        {params.value}
      </Typography>
    )
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 130,
    renderCell: (params) =>
      params.value ? (
        <Typography variant="body1" color="text.primary">
          Mint{' '}
          <Typography
            variant="body1"
            color="primary.dark"
            sx={{ display: 'inline-block', fontWeight: 600 }}
          >
            {params.value}
          </Typography>
          <Typography variant="body1" sx={{ display: 'inline-block', fontWeight: 600 }}>
            /30
          </Typography>
        </Typography>
      ) : (
        <Typography variant="body1" color="grey.500">
          Undeployed
        </Typography>
      )
  },
  {
    field: 'publishOn',
    headerName: 'PUBLISH ON',
    width: 260,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: '10px', overflow: 'hidden' }}>
        {params.value.map((item: string, index: Key) => {
          return <Box key={index} component="img" src={item} sx={{ height: 30 }} />;
        })}
      </Box>
    ),
    sortable: false
  },
  {
    field: 'totalRevenue',
    headerName: 'TOTAL REVENUE',
    width: 130,
    renderCell: (params) => (
      <Typography variant="subtitle1" color="text.primary">
        {params.value}
      </Typography>
    )
  }
];

const rows = [
  {
    id: 1,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Dangerous Gang in New York',
    network: 'Etherium',
    status: 15,
    publishOn: [
      './static/icons/shared/opensea.svg',
      './static/icons/shared/avalanche.svg',
      './static/icons/shared/near.svg'
    ],
    totalRevenue: '11 ETH'
  },
  {
    id: 2,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Safe Gang in New York',
    network: 'Etherium',
    status: 11,
    publishOn: ['./static/icons/shared/opensea.svg', './static/icons/shared/polygon.svg'],
    totalRevenue: '11 ETH'
  },
  {
    id: 3,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Dangerous Gang in Vietnam',
    network: 'Etherium',
    status: 12,
    publishOn: [],
    totalRevenue: '11 ETH'
  },
  {
    id: 4,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Khá Bảnh',
    network: 'Etherium',
    status: 0,
    publishOn: [],
    totalRevenue: '11 ETH'
  },
  {
    id: 5,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Tiến Bịp',
    network: 'Etherium',
    status: 0,
    publishOn: [],
    totalRevenue: '11 ETH'
  },
  {
    id: 6,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Huấn Hoa Hồng',
    network: 'Etherium',
    status: 0,
    publishOn: [],
    totalRevenue: '11 ETH'
  },
  {
    id: 7,
    preview: 'static/mock-images/other/dummy-small-avatar.png',
    type: 'static/mock-images/other/dummy-type.png',
    name: 'Chi Pu',
    network: 'Etherium',
    status: 0,
    publishOn: [],
    totalRevenue: '11 ETH'
  }
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: 'none',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '18px',
    borderRadius: 'unset',
    color: theme.palette.text.secondary
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    gap: '10px'
  },
  '& .MuiDataGrid-row': {
    backgroundColor: theme.palette.background.neutral,
    borderRadius: '8px',
    maxWidth: APP_BAR_MAX_WIDTH,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.main
    }
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none'
  }
}));

const CollectionsSection = () => {
  const { title, menuItems } = COLLECTION_ITEM;
  return (
    <Stack>
      <SectionHeader title={title} menuItems={menuItems} />
      <Box sx={{ height: 450, width: '100%' }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Stack>
  );
};

export default CollectionsSection;
