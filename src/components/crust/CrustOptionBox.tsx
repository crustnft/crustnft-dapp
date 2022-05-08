import { Box, styled } from '@mui/material';
import { pxToRem } from 'utils/getFontValue';

const CrustOptionBox = styled(Box)(({ theme }) => ({
  border: `solid 2px ${theme.palette.grey[300]}`,
  borderRadius: pxToRem(12),
  padding: pxToRem(19),
  textAlign: 'center',
  '> *': {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  '&.Mui-selected': {
    borderColor: theme.colors?.accent.main || theme.palette.secondary.main,
    backgroundColor: theme.colors?.accent.lighter || theme.palette.secondary.lighter
  }
}));
export default CrustOptionBox;
