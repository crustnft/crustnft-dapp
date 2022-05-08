import { Typography } from '@mui/material';
import { pxToRem } from 'utils/getFontValue';

type Props = React.PropsWithChildren<{
  label: string;
}>;
export default function CrustFieldset({ label, children }: Props) {
  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          marginTop: pxToRem(32),
          marginBottom: pxToRem(25)
        }}
      >
        {label}
      </Typography>
      {children}
    </div>
  );
}
