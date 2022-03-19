import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useWeb3 from 'hooks/useWeb3';
import Image from './Image';
import MyAvatar from './MyAvatar';

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    // ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

export default function ProfileCover() {
  const { account } = useWeb3();
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">Display Name</Typography>
          <Typography sx={{ opacity: 0.72 }}>Sub Name</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={`https://mewcard.mewapi.io/?address=${account}`}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
