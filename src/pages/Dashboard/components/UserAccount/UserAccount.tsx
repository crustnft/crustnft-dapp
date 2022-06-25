import { Box, Card, Stack, Typography } from '@mui/material';

const accountInfo = [
  {
    title: 'Address',
    content: ['djhsig937643krew96']
  },
  { title: 'Connected network', content: ['Ethereum'] },
  { title: 'Other active network', content: ['Binance', 'Polygon'] }
];

const UserAccount = () => {
  return (
    <Card
      sx={[
        {
          p: '20px'
        },
        (theme) => theme.palette.customCSS.card
      ]}
    >
      <Box
        component="img"
        src="/static/mock-images/other/dummy-avatar.png"
        alt="account"
        sx={{ width: '100%' }}
      />

      {accountInfo.map((item) => (
        <Stack key={item.title}>
          <Typography variant="h6" color="text.primary" sx={{ mt: '17px' }}>
            {item.title}
          </Typography>

          {item.content.map((content, index) => (
            <Typography variant="body1" color="text.secondary" sx={{ mt: '5px' }} key={index}>
              {content}
            </Typography>
          ))}
        </Stack>
      ))}
    </Card>
  );
};

export default UserAccount;
