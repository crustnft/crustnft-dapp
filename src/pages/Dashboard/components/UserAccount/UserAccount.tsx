import { Box, Card, Typography } from '@mui/material';

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

      {accountInfo.map((item, index) => (
        <>
          <Typography variant="h6" color="grey.900" sx={{ mt: '17px' }} key={index}>
            {item.title}
          </Typography>

          {item.content.map((content, ind) => (
            <Typography variant="body1" color="grey.600" sx={{ mt: '5px' }} key={ind}>
              {content}
            </Typography>
          ))}
        </>
      ))}
    </Card>
  );
};

export default UserAccount;
