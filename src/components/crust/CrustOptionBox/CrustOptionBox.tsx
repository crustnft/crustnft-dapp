import { Box, BoxProps, styled } from '@mui/material';
import { pxToRem } from 'utils/getFontValue';

const OptionBox = styled(Box)(({ theme }) => ({
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
const CrustOptionBox = (props: BoxProps & { selected?: boolean }) => (
  <OptionBox
    {...props}
    className={(props.className || '').concat(' ', (props.selected && 'Mui-selected') || '')}
  />
);

export default CrustOptionBox;
