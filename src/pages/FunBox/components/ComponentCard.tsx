import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  CardActionArea,
  Grid,
  Link,
  Paper,
  Typography
} from '../../../components/@c-components';
//
import { MotionInView, varFadeInUp } from '../../../components/animate';

// ----------------------------------------------------------------------

type ComponentCardProps = {
  item: {
    name: string;
    icon: string;
    href: string;
  };
};

export default function ComponentCard({ item }: ComponentCardProps) {
  const { name, icon, href } = item;

  return (
    <Grid item xs={6} sm={4} md={2}>
      <MotionInView variants={varFadeInUp}>
        <Link component={RouterLink} to={href} underline="none">
          <Paper
            sx={{
              p: 1,
              boxShadow: (theme) => theme.customShadows.z8,
              '&:hover img': { transform: 'scale(1.1)' }
            }}
          >
            <CardActionArea
              sx={{
                p: 3,
                borderRadius: 1,
                color: 'primary.main',
                bgcolor: 'background.neutral'
              }}
            >
              <Box
                component="img"
                src={icon}
                alt={name}
                sx={{
                  mx: 'auto',
                  transition: (theme) => theme.transitions.create('all')
                }}
              />
            </CardActionArea>

            <Typography variant="subtitle2" sx={{ mt: 1, p: 1 }}>
              {name}
            </Typography>
          </Paper>
        </Link>
      </MotionInView>
    </Grid>
  );
}
