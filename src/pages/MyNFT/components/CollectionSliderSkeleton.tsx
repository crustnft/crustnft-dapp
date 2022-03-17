import { Box, Card, CardHeader, Paper, Skeleton, Stack } from '@mui/material';
import Slider from 'react-slick';

export default function CollectionSliderSkeleton() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
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
    <Card sx={{ p: { xs: 0.5, sm: 0.75, md: 1 } }}>
      <CardHeader
        title={<Skeleton animation="wave" height={30} width="100%" />}
        sx={{
          pl: 2,
          pr: 5,
          mb: 1
        }}
      />
      <Stack sx={{ m: 1 }}>
        <Slider {...settings}>
          <Box sx={{ px: 1, py: 0, position: 'relative' }}>
            <Paper
              sx={{
                boxShadow: 'none',
                borderRadius: '18px',
                width: '100%',
                aspectRatio: '1 / 1.25'
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={1}
                sx={{ height: '100%' }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ height: 'inherit', p: 2, borderRadius: '18px' }}
                ></Skeleton>
              </Stack>
            </Paper>
          </Box>

          {[...Array(3)].map((_, index) => (
            <Box key={index} />
          ))}
        </Slider>
      </Stack>
    </Card>
  );
}
