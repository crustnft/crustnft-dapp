import { Icon } from '@iconify/react';
import { Box, Button, Card, CardHeader, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Slider from 'react-slick';
import { TypographyWithSubtitle } from './TitleWithSubtitle';

export default function EmptyCollectionBox({
  contractAddr,
  chainId,
  totalSupply,
  collectionTitle,
  chainName
}: {
  contractAddr: string;
  chainId: number;
  totalSupply: number;
  collectionTitle: string;
  chainName: String;
}) {
  const theme = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Card sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 1 }}>
      <CardHeader
        title={
          <TypographyWithSubtitle
            title={collectionTitle}
            subTitle={`(${totalSupply} NFTs)`}
            titleSize="h4"
            subTitleSize="subtitle2"
          />
        }
        action={
          <Stack sx={{ mr: 5 }}>
            <Link href={`#/mint-nft/${chainName}/${contractAddr}`}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  px: 3,
                  borderRadius: '26px',
                  py: 0.5,
                  bgcolor: theme.palette.additional.yellowButton,
                  color: theme.palette.text.primary
                }}
              >
                Mint NFT
              </Button>
            </Link>
          </Stack>
        }
        sx={{
          p: 1,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      <Stack sx={{ mx: -1 }}>
        <Slider {...settings}>
          <Link href={`#/mint-nft/${chainName}/${contractAddr}`}>
            <Box sx={{ px: 2, py: 0, position: 'relative' }}>
              <Paper
                sx={{
                  boxShadow: 'none',
                  bgcolor: 'transparent',
                  transition: 'all .2s ease-in-out',
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23333' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                  borderRadius: '18px',
                  opacity: 0.4,
                  width: '100%',
                  aspectRatio: '1 / 1.15'
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  spacing={1}
                  sx={{ height: '100%' }}
                >
                  <Icon width="53px" height="53px" icon="akar-icons:plus" />
                  <Stack alignItems="center" justifyContent="center" sx={{ px: 1 }}>
                    <Typography variant="subtitle2" align="center">
                      Your collection is empty, add it now!
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Link>

          {[...Array(3)].map((_, index) => (
            <Box key={index} />
          ))}
        </Slider>
      </Stack>
    </Card>
  );
}
