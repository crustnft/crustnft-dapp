import { Tooltip } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { IconButtonAnimate } from 'components/animate';
import Iconify from 'components/Iconify';

const RootStyle = styled('span')(({ theme }) => ({
  right: 20,
  bottom: '3%',

  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.36
  )}`
}));

const DotStyle = styled('span')(({ theme }) => ({
  top: 8,
  width: 8,
  height: 8,
  right: 10,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: theme.palette.error.main
}));

export default function ToggleButton({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <RootStyle>
      <DotStyle />

      <Tooltip title="Preview" placement="left">
        <IconButtonAnimate
          color="inherit"
          onClick={() => {
            if (open) setOpen(false);
            else setOpen(true);
          }}
          sx={{
            p: 1.25,
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': {
              color: 'primary.main',
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
            }
          }}
        >
          <Iconify icon="fluent:draw-image-20-regular" width={20} height={20} />
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
}
