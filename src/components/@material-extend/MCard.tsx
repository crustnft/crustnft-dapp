import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MCardProps extends CardProps {
  hoverEffect?: boolean;
}

const MCard = styled(Card)<MCardProps>(({ hoverEffect, theme }) => ({
  backgroundColor: theme.palette.card.background,
  ...(hoverEffect && {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: theme.customShadows.z24,
      transform: 'translateY(-13px)',
      transition: 'all 0.3s ease-in-out'
    }
  })
}));

export default MCard;
