import { styled } from '@mui/material/styles';
import { Typography } from '../@c-components';

const Separator = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

export default Separator;
